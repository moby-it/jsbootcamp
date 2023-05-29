class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get born() {
    return new Date().getFullYear() - this.age;
  }
  greet() {
    console.log("hi");
  }
}

class Employee extends Person {
  constructor(name, age, yearsOfEmployeement) {
    super(name, age);
    this.yearsOfEmployeement = yearsOfEmployeement;
  }
  get startedWorking() {
    return new Date().getFullYear() - this.yearsOfEmployeement;
  }
}

const greg = new Employee("greg", 30, 2020);

console.log(greg);
console.log(greg.born);
console.log(greg.startedWorking);

const stef = Object.create(greg);
stef.name = 'stef'
console.log(stef);
console.log(stef.born);
console.log(stef.startedWorking);