class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log(
      "A square is a quadrilateral with all sides equal and all angles at 90 degrees."
    );
  }

  length() {
    console.log(4 * this.a);
  }

  square() {
    console.log(this.a * this.a);
  }

  info() {
    console.log(`Square characteristics:
- Side lengths: ${this.a} (4 times)
- Angles: 90 degrees each`);
    console.log("- Perimeter:");
    this.length();
    console.log("- Area:");
    this.square();
  }
}

export default Square;
