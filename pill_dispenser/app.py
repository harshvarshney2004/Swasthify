from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)  # Corrected here
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client["servoDB"]
times_col = db["timestamps"]

@app.route("/set_times", methods=["POST"])
def set_times():
    data = request.json
    times_col.delete_many({})
    times_col.insert_one(data)
    return "Times saved!"

@app.route("/get_times", methods=["GET"])
def get_times():
    doc = times_col.find_one()
    if doc:
        del doc["_id"]
        return jsonify(doc)
    else:
        return jsonify({"error": "No timestamps found"}), 404

if __name__ == "__main__":  # Corrected here
    app.run(host="0.0.0.0", port=7500)