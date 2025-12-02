// Імпортуємо клас Square
import Square from "./Square.js";

class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this._alpha = alpha;
    this._beta = beta;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    if (value > 0 && value < 180) {
      this._alpha = value;
    } else {
      console.error("Alpha angle must be between 0 and 180 degrees.");
    }
  }

  get beta() {
    return this._beta;
  }

  set beta(value) {
    if (value > 0 && value < 180) {
      this._beta = value;
    } else {
      console.error("Beta angle must be between 0 and 180 degrees.");
    }
  }

  static help() {
    console.log(
      "A rhombus is a quadrilateral with all sides equal but opposite angles are equal."
    );
  }

  length() {
    console.log(4 * this.a);
  }

  square() {
    console.log(this.a * this.a * Math.sin(this._alpha * (Math.PI / 180)));
  }

  info() {
    console.log(`Rhombus characteristics:
- Side lengths: ${this.a} (4 times)
- Angles: ${this._alpha} and ${this._beta} degrees`);
    console.log("- Perimeter:");
    this.length();
    console.log("- Area:");
    this.square();
  }
}

export default Rhombus;
