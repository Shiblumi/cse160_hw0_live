// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve elements
  canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }
  drawButton = document
    .getElementById("drawButton")
    .addEventListener("click", handleDrawEvent);
  drawButton = document
    .getElementById("op_drawButton")
    .addEventListener("click", handleDrawOperationEvent);

  // Clear canvas to default color
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws a vector on the canvas with the specified color.
 * @param {Vector3} v - The vector to be drawn.
 * @param {string} color - The color of the vector.
 */
function drawVector(v, color) {
  center_x = canvas.width / 2;
  center_y = canvas.height / 2;

  // Draw vector
  ctx.beginPath();
  ctx.moveTo(center_x, center_y);
  ctx.lineTo(center_x + v.elements[0] * 20, center_y - v.elements[1] * 20);
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Handles the draw event by clearing the canvas and drawing a vector.
 */
function handleDrawEvent() {
  clearCanvas();

  let vs = getVectorInputValues();
  let v1 = vs[0];
  let v2 = vs[1];
  drawVector(v1, "red");
  drawVector(v2, "blue");
}

/**
 * Handles the draw operation event.
 * Clears the canvas, handles the draw event, and performs the selected vector operation.
 */
function handleDrawOperationEvent() {
  clearCanvas();
  handleDrawEvent();

  let vs = getVectorInputValues();
  let v1 = vs[0];
  let v2 = vs[1];

  let operation = document.getElementById("op-select").value;
  let scalar = document.getElementById("scalar_val").value;
  switch (operation) {
    case "add":
      drawVector(v1.add(v2), "green");
      break;
    case "subtract":
      drawVector(v1.sub(v2), "green");
      break;
    case "divide":
      drawVector(v1.div(scalar), "green");
      break;
    case "multiply":
      drawVector(v1.mul(scalar), "green");
      break;
    case "magnitude":
      let m1 = v1.magnitude();
      let m2 = v2.magnitude();
      console.log("Magnitude V1: " + m1.toFixed(1));
      console.log("Magnitude V2: " + m2.toFixed(1));
      break;
    case "normalize":
      drawVector(v1.normalize(), "green");
      drawVector(v2.normalize(), "green");
      break;
    case "angle-between":
      let angle = angleBetween(v1, v2);
      console.log("Angle between V1 and V2: " + angle);
      break;
    case "area":
      let area = areaTriangle(v1, v2);
      console.log("Area of triangle: " + area.toFixed(1));
  }
}

/**
 * Calculates the angle between two vectors.
 * @param {Vector} v1 - The first vector.
 * @param {Vector} v2 - The second vector.
 * @returns {number} The angle between the two vectors in radians.
 */
function angleBetween(v1, v2) {
  let dot = Vector3.dot(v1, v2);
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();
  let cos = dot / (m1 * m2);
  let angle_rad = Math.acos(cos);
  let angle_deg = (angle_rad * 180) / Math.PI;
  return angle_deg;
}

/**
 * Calculates the area of a triangle given two vectors.
 *
 * @param {Vector3} v1 - The first vector.
 * @param {Vector3} v2 - The second vector.
 * @returns {number} The area of the triangle.
 */
function areaTriangle(v1, v2) {
  var cross_prod = Vector3.cross(v1, v2);
  return 0.5 * Vector3.cross(v1, v2).magnitude();
}

/**
 * Retrieves the input values for two vectors from the DOM and creates Vector3 objects.
 * @returns {Array<Vector3>} An array containing the two Vector3 objects.
 */
function getVectorInputValues() {
  let v1_xInput = document.getElementById("x_val_V1");
  let v1_x = v1_xInput.value;
  let v1_yInput = document.getElementById("y_val_V1");
  let v1_y = v1_yInput.value;

  let v2_xInput = document.getElementById("x_val_V2");
  let v2_x = v2_xInput.value;
  let v2_yInput = document.getElementById("y_val_V2");
  let v2_y = v2_yInput.value;

  let v1 = new Vector3([v1_x, v1_y, 0.0]);
  let v2 = new Vector3([v2_x, v2_y, 0.0]);

  return [v1, v2];
}

/**
 * Clears the canvas by filling it with a solid black color.
 */
function clearCanvas() {
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
