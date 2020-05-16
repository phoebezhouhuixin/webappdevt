// code is cumulative
let x = 3;
x += 5;
console.log(x);

// predefined functions
let pi = Math.round(3.14) // returns 3
console.log(pi)

// creating your own functions
function add_ten(x){
  return x+=10;
}
let b = add_ten(10);
console.log(b);

// primitive data types: number, string, boolean
console.log(typeof(b))
console.log(typeof(1.23))
// array
let numbers = [4,5,6]
console.log(numbers[2]) // indexing