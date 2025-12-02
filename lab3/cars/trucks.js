function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
    } else {
      let message = `Driver ${this.driver.name}`;
      message += this.driver.nightDriving
        ? " drives at night"
        : " does not drive at night";
      message += ` and has ${this.driver.experience} years of experience.`;
      console.log(message);
    }
  };
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience,
  };
};

const truck1 = new Truck("black", 3000, 70.5, "Volvo", "FH16");
const truck2 = new Truck("white", 2500, 60.5, "MAN", "TGX");

truck1.AssignDriver("Nazar Mocherniuk", true, 5);
truck2.AssignDriver("Nazar Mocherniuk", false, 3);

truck1.trip();
truck2.trip();
