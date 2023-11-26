let messageIndex = 0;
let messages = [
  "Hello",
  "My name is AVI. I am a digital assistant created by An.",
  "If it's alright with you, I'd like to ask you to do something for me.",
  "But first, let me explain why",
  "You will be given a number based on the area and duration you hold your mouse down for.",
  "Okay now, hold your mouse down for me. You are free to let go whenever you'd like.",
  "Thank you. You have been assigned a number ()"
];

let holdingMouse = false;
let startTime, endTime;
let assignedNumber;

function setup() {
  createCanvas(windowWidth, windowHeight)
  displayMessage();
}

function draw() {
  if (holdingMouse) {
    let pressure = map(sin(frameCount * 0.1), -1, 1, 5, 20);
    background(255);
    ellipse(width / 2, height / 2, pressure, pressure);
  }
}

function mousePressed() {
  holdingMouse = true;
  startTime = millis();
}

function mouseReleased() {
  holdingMouse = false;
  endTime = millis();
  calculateAssignedNumber();
  if (messageIndex < messages.length - 1) {
    // Only display the next message if there are more messages in the array
    messageIndex++;
    displayMessage();
  }
}

function calculateAssignedNumber() {
  let holdDuration = (endTime - startTime) / 1000; // Convert to seconds
  let area = sq(mouseX - width / 2) + sq(mouseY - height / 2); // Area of the ellipse

  // Map area and duration to the assigned number
  assignedNumber = floor(map(area * holdDuration, 0, width * height * 10, 1, 30));
  assignedNumber = constrain(assignedNumber, 1, 30); // Ensure the number is within the desired range

  // Update the message with the assigned number
  messages[6] = `Thank you. You have been assigned a number (${assignedNumber}).`;
}

function displayMessage() {
  background(255);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  
  // Explicitly set the vertical position for the text
  let textY = height / 2;
  text(messages[messageIndex], width / 2, textY);
}
