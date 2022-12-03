// string
var fullName: string = 'Nate Murray';
// number
var age: number = 36;
// boolean
var married: boolean = true;
// array of string
var jobs: Array<string> = ['IBM', 'Microsoft', 'Google'];
var jobs2: string[] = ['Apple', 'Dell', 'HP'];
// array of number
var chickens: Array<number> = [1, 2, 3];
var chickens2: number[] = [4, 5, 6];

// enums, default initial value for an enum is 0
enum Role { Employee, Manager, Admin };
var role: Role = Role.Employee;

// enum Role {Employee = 3, Manager, Admin};
// enum Role {Employee = 3, Manager = 5, Admin = 7};
console.log('Roles: ', Role[0], ',', Role[1], 'and', Role[2]);

// any is the default type if we omit typing for a given variable
// having a variable of type any allows it to receive any kind of value:
var something: any = 'as string';
something = 1;
something = [1, 2, 3];

// using void means there’s no type expected
// this is usually in functions with no return value
function setName(name: string): void {
  this.fullName = name;
}

// classes may have properties, methods, and constructors
// in TypeScript you can have only one constructor per class
class Person {
  first_name: string;
  last_name: string;
  age: number;

  constructor(first_name: string, last_name: string, age: number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
  }

  // when methods don’t declare an explicit returning type and return a value, 
  // it’s assumed they can return anything (any type)
  greet() {
    console.log("Hello", this.first_name);
  }
}

var p: Person = new Person('Felipe', 'Coury', 36);
p.greet();


class Report {
  data: Array<string>;
  constructor(data: Array<string>) {
    this.data = data;
  }
  run() {
    this.data.forEach(function (line) { console.log(line); });
  }
}

var r: Report = new Report(['First line', 'Second line']);
r.run();

// inheritance
class TabbedReport extends Report {
  headers: Array<string>;
  constructor(headers: string[], values: string[]) {
    super(values);
    this.headers = headers;
  }
  run() {
    console.log(this.headers);
    super.run();
  }
}

var headers: string[] = ['Name'];
var data: string[] = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];
var tr: TabbedReport = new TabbedReport(headers, data)
tr.run();

// Fat arrow => functions are a shorthand notation for writing functions
// es5 example
var data = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];
data.forEach(function(line) { console.log(line); });
// typescript example
var tsdata: string[] = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];
tsdata.forEach( (line) => console.log(line) );

// One important feature of the => syntax is that it shares the same this as the surrounding code
// This is important and different than what happens when you normally create a function in JavaScript
// Generally when you write a function in JavaScript that function is given its own this

// normal javascript
var nate = {
  name: 'Nate',
  guitars: ["Gibson", "Martin", "Taylor"],
  printGuitars: function() {
    var self = this;
    this.guitars.forEach(function(g) {
      // this.name is undefined so we have to use self.name
      console.log(self.name + " plays a " + g);
    });
  }
}

// fat arrows are a great way to cleanup your inline functions
var tsnate = {
  name: 'Nate',
  guitars: ["Gibson", "Martin", "Taylor"],
  printGuitars: function() {
    this.guitars.forEach((g) => {
      console.log(this.name + " plays a " + g);
    });
  }
}


// strings interpolation
// to use string interpolation you must enclose your string in backticks not single or double quotes
var firstName = "Nate";
var lastName = "Murray";
var greeting = `Hello ${firstName} ${lastName}`;
console.log(greeting);

// multiline strings
var template = `
<div>
  <h1>Hello</h1>
  <p>This is a great website</p>
</div>`


// variety of other features in TypeScript/ES6
// interfaces, generics, importing and exporting modules, decorators, destructuring
