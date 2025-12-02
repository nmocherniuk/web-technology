// Display usage instructions when script loads
console.log(`
Usage instructions:
triangle(value1, "type1", value2, "type2");

Available types:
- "leg" - leg (cathetus)
- "hypotenuse" - hypotenuse
- "adjacent angle" - angle adjacent to a leg
- "opposite angle" - angle opposite to a leg
- "angle" - one of the two acute angles (when hypotenuse is given)

Examples:
triangle(7, "leg", 18, "hypotenuse");
triangle(8, "hypotenuse", 4, "leg");
triangle(60, "opposite angle", 5, "leg");
`);

/**
 * Solves a right triangle given two elements and their types
 * @param {number} value1 - First value
 * @param {string} type1 - Type of first value
 * @param {number} value2 - Second value
 * @param {string} type2 - Type of second value
 * @returns {string} "success" if calculation succeeded, error message or "failed" otherwise
 */
function triangle(value1, type1, value2, type2) {
  // Valid type definitions
  const validTypes = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  // Validate input types
  if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
    console.log("Incorrect type. Please read the instruction again.");
    return "failed";
  }

  // Check for zero or negative values
  if (value1 <= 0 || value2 <= 0) {
    console.log("Zero or negative input");
    return "Zero or negative input";
  }

  // Helper functions for angle conversion
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const toDegrees = (radians) => (radians * 180) / Math.PI;

  // Variables for triangle sides and angles
  // a, b - legs, c - hypotenuse
  // alpha - angle opposite to leg a, beta - angle opposite to leg b
  let a, b, c, alpha, beta;

  // Case 1: Two legs
  if (type1 === "leg" && type2 === "leg") {
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDegrees(Math.atan(a / b));
    beta = 90 - alpha;
  }
  // Case 2: Leg and hypotenuse
  else if (
    (type1 === "leg" && type2 === "hypotenuse") ||
    (type1 === "hypotenuse" && type2 === "leg")
  ) {
    const leg = type1 === "leg" ? value1 : value2;
    const hypotenuse = type1 === "hypotenuse" ? value1 : value2;

    if (leg >= hypotenuse) {
      console.log("Leg cannot be greater than or equal to the hypotenuse");
      return "Leg cannot be greater than or equal to the hypotenuse";
    }

    a = leg;
    c = hypotenuse;
    b = Math.sqrt(c * c - a * a);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  }
  // Case 3: Leg and opposite angle
  else if (
    (type1 === "leg" && type2 === "opposite angle") ||
    (type1 === "opposite angle" && type2 === "leg")
  ) {
    const leg = type1 === "leg" ? value1 : value2;
    const oppositeAngle = type1 === "opposite angle" ? value1 : value2;

    if (oppositeAngle >= 90) {
      console.log("Angle must be less than 90 degrees");
      return "Angle must be less than 90 degrees";
    }

    a = leg;
    alpha = oppositeAngle;
    c = a / Math.sin(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }
  // Case 4: Leg and adjacent angle
  else if (
    (type1 === "leg" && type2 === "adjacent angle") ||
    (type1 === "adjacent angle" && type2 === "leg")
  ) {
    const leg = type1 === "leg" ? value1 : value2;
    const adjacentAngle = type1 === "adjacent angle" ? value1 : value2;

    if (adjacentAngle >= 90) {
      console.log("Angle must be less than 90 degrees");
      return "Angle must be less than 90 degrees";
    }

    b = leg;
    alpha = adjacentAngle;
    beta = 90 - alpha;
    c = b / Math.cos(toRadians(alpha));
    a = Math.sqrt(c * c - b * b);
  }
  // Case 5: Hypotenuse and angle
  else if (
    (type1 === "hypotenuse" && type2 === "angle") ||
    (type1 === "angle" && type2 === "hypotenuse")
  ) {
    const hypotenuse = type1 === "hypotenuse" ? value1 : value2;
    const angle = type1 === "angle" ? value1 : value2;

    if (angle >= 90) {
      console.log("Angle must be less than 90 degrees");
      return "Angle must be less than 90 degrees";
    }

    c = hypotenuse;
    alpha = angle;
    a = c * Math.sin(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }
  // Case 6: Hypotenuse and opposite angle
  else if (
    (type1 === "hypotenuse" && type2 === "opposite angle") ||
    (type1 === "opposite angle" && type2 === "hypotenuse")
  ) {
    const hypotenuse = type1 === "hypotenuse" ? value1 : value2;
    const oppositeAngle = type1 === "opposite angle" ? value1 : value2;

    if (oppositeAngle >= 90) {
      console.log("Angle must be less than 90 degrees");
      return "Angle must be less than 90 degrees";
    }

    c = hypotenuse;
    alpha = oppositeAngle;
    a = c * Math.sin(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }
  // Case 7: Hypotenuse and adjacent angle
  else if (
    (type1 === "hypotenuse" && type2 === "adjacent angle") ||
    (type1 === "adjacent angle" && type2 === "hypotenuse")
  ) {
    const hypotenuse = type1 === "hypotenuse" ? value1 : value2;
    const adjacentAngle = type1 === "adjacent angle" ? value1 : value2;

    if (adjacentAngle >= 90) {
      console.log("Angle must be less than 90 degrees");
      return "Angle must be less than 90 degrees";
    }

    c = hypotenuse;
    alpha = adjacentAngle;
    beta = 90 - alpha;
    b = c * Math.cos(toRadians(alpha));
    a = Math.sqrt(c * c - b * b);
  }
  // Unsupported combination
  else {
    console.log(
      "Unsupported combination of types. Please read the instruction again."
    );
    return "failed";
  }

  // Output results
  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`c = ${c}`);
  console.log(`alpha = ${alpha}`);
  console.log(`beta = ${beta}`);

  return "success";
}
