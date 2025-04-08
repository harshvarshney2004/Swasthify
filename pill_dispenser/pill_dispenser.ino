#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Servo.h>
#include <time.h>

const char* ssid = "Ayush";
const char* password = "ayush123";
const char* flaskServer = "http://192.168.67.235:7500/get_times";

Servo myServo;
int servoPin = D2;
int buzzerPin = D5;

String timestamps[10]; // store up to 10 timestamps
int totalTimestamps = 0;
int currentIndex = 0;
bool triggered[10]; // flags to track if timestamp has triggered
int currentPosition = 0; // start at 0 degrees

void beep() {
  digitalWrite(buzzerPin, HIGH);
  delay(100);
  digitalWrite(buzzerPin, LOW);
}

String getCurrentTime() {
  time_t now = time(nullptr);
  struct tm* timeinfo = localtime(&now);
  char buffer[6];
  sprintf(buffer, "%02d:%02d", timeinfo->tm_hour, timeinfo->tm_min);
  return String(buffer);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  myServo.attach(servoPin);
  pinMode(buzzerPin, OUTPUT);
  myServo.write(0);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  configTime(19800, 0, "pool.ntp.org", "time.nist.gov");
  while (time(nullptr) < 100000) {
    delay(500);
    Serial.print("Syncing time...\n");
  }
  Serial.println("Time synced.");

  // Fetch timestamps from server
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClient client;
    http.begin(client, flaskServer);
    int httpCode = http.GET();

    if (httpCode == 200) {
      String payload = http.getString();
      Serial.println("Received timestamps: " + payload);

      StaticJsonDocument<512> doc;
      DeserializationError error = deserializeJson(doc, payload);
      if (!error) {
        // Iterate and store dynamic number of timestamps
        for (int i = 1; i <= 10; i++) {
          String key = "time" + String(i);
          if (doc.containsKey(key)) {
            timestamps[totalTimestamps] = doc[key].as<String>();
            triggered[totalTimestamps] = false;
            Serial.println("Stored timestamp: " + timestamps[totalTimestamps]);
            totalTimestamps++;
          } else {
            break;
          }
        }
      } else {
        Serial.println("Failed to parse JSON");
      }
    } else {
      Serial.printf("HTTP GET failed, code: %d\n", httpCode);
    }
    http.end();
  }
}

void loop() {
  String currentTime = getCurrentTime();
  Serial.println("Current Time: " + currentTime);

  for (int i = 0; i < totalTimestamps; i++) {
    if (!triggered[i] && currentTime == timestamps[i]) {
      currentPosition = (currentPosition == 0) ? 180 : 0;
      myServo.write(currentPosition);
      beep();
      Serial.printf("Triggered timestamp %d: %s, moved to %d°\n", i + 1, timestamps[i].c_str(), currentPosition);
      triggered[i] = true;
    }
  }

  delay(1000);
}