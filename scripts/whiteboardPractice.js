// return sum of two num, unless equal, then return three times the sum
function rtnSum(i, x) {
  if (i != x) {
    return i + x;
  } else {
    return (i + x) * 3;
  }
}

rtnSum(5, 7);

// return highest of 3 numbers version 1
function highestVal(x, y, z) {
  if (x > y) {
    return x;
  } else if (y > z) {
    return y;
  } else {
    return z;
  }
};

highestVal(5, 8, 1);

// return highest of 3 - Matt's version
const list = [3, 2, 5, 4, 7, 2];

let highest = list[0];
list.forEach(num => {
  if (num > highest) {
    highest = num;
  }
});

console.log(highest);

// return highest of 3 - Matt's map way:
let list = [3, 2, 5, 4, 7, 2, 7];

let highest = list[0];
list.map(num => {
  if (num > highest) {
    highest = num;
  }
});

console.log(highest);

// return highest of 3 and map result
let list = [3,2,5,4,7,2,7];

let highest = list[0];

let result = list.map(num => {
  if (num > highest) {
    highest = num;
  }
});

console.log("highest", highest);
console.log("result", result);

// Generate a random number
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Examine random number
function testNum() {
  let num = randomNum(0, 10);
  if (num > 5) {
    return `${num} is greater than five!`;
  }
  if (num < 5) {
    return `${num} is less than five!`;
  }
  if (num === 5) {
    return `${num} is five!`;
  }
}

testNum();
