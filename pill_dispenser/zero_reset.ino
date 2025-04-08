#include <Servo.h>

#define SERVO_PIN D2  // GPIO4

Servo myServo;

void setup() {
  Serial.begin(115200);
  myServo.attach(SERVO_PIN);
  delay(500); // Optional wait for servo to initialize

  myServo.write(0); // Move to 0°
  Serial.println("Servo set to 0 degrees");
}

void loop() {
  // Do nothing
}