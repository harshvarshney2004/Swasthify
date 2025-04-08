from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS  # Import CORS
from langchain_community.llms import Ollama
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
from reportlab.lib.units import inch
import requests
import joblib
import numpy as np
import tensorflow as tf
from PIL import Image
import io
from tensorflow.keras.models import load_model
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the model
cached_llm = Ollama(model="medllama2")
diabetes_model = joblib.load('diabetes_model.pkl')
model_hemorrhage = tf.keras.models.load_model('hemorrhage_detection_model.h5')
model = load_model('model_new.h5')
heart_model = pickle.load(open('heart_disease_model.pkl', 'rb'))
# Breast cancer model and scaler
# breast_cancer_model = pickle.load(open('model.pkl', 'rb'))
# breast_cancer_scaler = pickle.load(open('scaler.pkl', 'rb'))

class_labels = [
    'acne',
    'alopecia',
    'athlete foot',
    'cellulitis',
    'chickenpox',
    'cutaneous larva migrans',
    'impetigo',
    'nail fungus',
    'ringworm',
    'shingles',
    'urticaria', 
    'vitiligo'
]

# Helper functions
def preprocess_image(image_file):
    image = Image.open(io.BytesIO(image_file.read()))
    image = image.convert('L')
    image = image.resize((128, 128))  # Assuming this is the expected input size for your model
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    image_array = np.expand_dims(image_array, axis=-1)
    return image_array

def preprocess_image1(image_path):
    img = Image.open(image_path)
    img = img.resize((299, 299))  # Resize to match input size of the model
    img = np.array(img) / 255.0   # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

def classify_image1(image_path):
    img = preprocess_image1(image_path)
    predictions = model.predict(img)
    predicted_class = np.argmax(predictions)
    confidence_score = np.max(predictions) * 100  # Get the confidence score as a percentage
    disease_name = class_labels[predicted_class]
    return disease_name, confidence_score

# Optional: A simple home route for testing
@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running."})

@app.route('/classify', methods=['POST'])
def classify_uploaded_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    image_path = image_file.filename
    image_file.save(image_path)

    # Assuming classify_image1 returns the disease name and confidence score.
    disease_name, confidence_score = classify_image1(image_path)

    # Clean up the uploaded file if needed
    os.remove(image_path)

    # Return the result as JSON
    return jsonify({
        "disease": disease_name,
        "confidence": confidence_score
    }), 200

@app.route('/predict_hemorrhage', methods=['POST'])
def predict_hemorrhage():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Preprocess image and make predictions
    image_data = preprocess_image(file)
    prediction = model_hemorrhage.predict(image_data)
    return jsonify(prediction.tolist())

@app.route('/predict_diabetes', methods=['POST'])
def predict():
    # Get data from JSON request
    data = request.json
    features = [
        float(data['preg']), float(data['glucose']), float(data['bp']),
        float(data['skin']), float(data['insulin']), float(data['bmi']),
        float(data['dpf']), float(data['age'])
    ]
    final_features = np.array([features])
    # Get prediction probabilities
    prediction = diabetes_model.predict(final_features)
    prediction_proba = diabetes_model.predict_proba(final_features)[0]

    # Prepare response
    result = {
        "label": "Diabetic" if prediction[0] == 1 else "Not Diabetic",
        "probability": {
            "diabetic": prediction_proba[1] * 100,
            "not_diabetic": prediction_proba[0] * 100
        }
    }
    return jsonify(result)

@app.route('/predict-heart', methods=['POST'])
def predict_heart():
    data = request.json

    required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
                       'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

    # Validate all fields are present
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing input data"}), 400

    # Extract and reshape input
    try:
        features = np.array([[
            float(data['age']), int(data['sex']), int(data['cp']),
            float(data['trestbps']), float(data['chol']), int(data['fbs']),
            int(data['restecg']), float(data['thalach']), int(data['exang']),
            float(data['oldpeak']), int(data['slope']), int(data['ca']), int(data['thal'])
        ]])
    except ValueError:
        return jsonify({"error": "Invalid input types"}), 400

    prediction = heart_model.predict(features)[0]

    result = {
        "prediction": int(prediction),
        "message": "Heart Disease Detected! Consult Doctor Immediately." if prediction == 1 else "No Heart Disease Detected."
    }

    return jsonify(result), 200

@app.route("/prescription-summary", methods=['POST'])
def prescription_summary():
    # Receive the full data from frontend (React)
    data = request.json
    appointment_id = data.get('appointmentId')
    symptoms = data.get('symptoms')
    medications = data.get('medicines')

    if not appointment_id or not symptoms or not medications:
        return jsonify({"error": "Invalid data received"}), 400

    # Create a summary of the medications with AI model
    summary = []
    for med in medications:
        name = med.get('name')
        times_per_day = med.get('timesPerDay')
        days = med.get('days')

        # Queries for purpose and special instructions
        query_purpose = f"What is {name} medicine used for? Answer in only 5 words."
        query_instructions = f"Any special instructions for {name}? Answer in only 5 words."

        # Fetching purpose and special instructions using AI model
        purpose_response = cached_llm.invoke(query_purpose)
        instructions_response = cached_llm.invoke(query_instructions)

        summary.append({
            "name": name,
            "timesPerDay": times_per_day,
            "days": days,
            "purpose": purpose_response,
            "instructions": instructions_response
        })
        print(summary)

    # Prepare the final summary response with appointment details
    prescription_summary_data = {
        "appointmentId": appointment_id,
        "symptoms": symptoms,
        "medicines": medications,  # Include original medicine details
        "summary": summary  # Include AI-generated purpose and instructions
    }

    # Send the full summary data (including original + AI-generated) to the Node.js backend
# Send the prescription summary to the Node.js backend
    try:
        node_response = requests.post(f'http://localhost:5000/api/appointments/prescriptions/{appointment_id}', json=prescription_summary_data)
        print(f"Response from Node.js backend: {node_response.status_code}, {node_response.text}")
        if node_response.status_code == 200:
            return jsonify({"message": "Prescription summary sent successfully!", "summary": prescription_summary_data}), 200
        else:
            return jsonify({"error": "Failed to send prescription summary to Node.js backend"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route("/symptom-checker", methods=["POST"])
def ai_post():
    json_content = request.json
    symptoms = json_content.get("symptoms")

    # Formulate the query for symptom-based diagnosis
    query = f"Given the following symptoms: {symptoms}, what potential illnesses could this person have? generate list of 3 possible illnesses"

    # Get the response from the model
    response = cached_llm.invoke(query)

    response_data = {"suggestions": response + " it's always better to consult a healthcare provider for a proper diagnosis."}
    return jsonify(response_data)

@app.route('/health-tips', methods=['POST'])
def health_tips():
    illness = request.json.get('illness')

    # Generate health tips, exercise, and dietary advice based on illness
    input_text = f"Generate health tips, exercise recommendations, and dietary advice from {illness}."
    response_text = cached_llm.invoke(input_text)

    return jsonify({'advice': response_text})

@app.route('/download-pdf', methods=['POST'])
def download_pdf():
    illness = request.json.get('illness')
    response_text = request.json.get('advice')

    # Create PDF
    pdf_filename = f"{illness}_health_tips.pdf"
    c = canvas.Canvas(pdf_filename, pagesize=letter)
    width, height = letter

    # Define margins
    margin = 1 * inch
    text_x = margin
    text_y = height - margin

    c.drawString(text_x, text_y, f"Health Tips for {illness}")

    text_y -= 20  # Move down for the title

    def wrap_text(text, max_width):
        lines = []
        words = text.split(' ')
        line = ''
        
        for word in words:
            if c.stringWidth(line + word + ' ', 'Helvetica', 12) < max_width:
                line += word + ' '
            else:
                lines.append(line.strip())
                line = word + ' '
        
        if line:
            lines.append(line.strip())
        
        return lines

    bullet_lines = response_text.split('\n')
    bullet_point_lines = [f"• {line.strip()}" for line in bullet_lines if line.strip()]

    for line in bullet_point_lines:
        wrapped_lines = wrap_text(line, width - 2 * margin)

        for wrapped_line in wrapped_lines:
            if text_y < margin:
                c.showPage()
                text_y = height - margin
            
            c.drawString(text_x, text_y, wrapped_line.strip())
            text_y -= 15

    c.save()

    return send_file(pdf_filename, as_attachment=True)

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json.get("message")
    if not message:
        return jsonify({"reply": "No message received."})

    query = f"User: {message}\nBot:"
    response = cached_llm.invoke(query)

    return jsonify({"reply": response})

def start_app():
    app.run(host="127.0.0.1", port=8080, debug=True)

if __name__ == "__main__":
    start_app()