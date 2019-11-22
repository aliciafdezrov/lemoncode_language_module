console.group(" 1. ARRAY OPERATIONS");

const testArray: Array<number> = [1,5,5,6,2,3,1,2,1,0];

console.log("The array used for examples purpouses is: ", testArray);

console.log("%c Exercise 1: Head", "color: green");

const head = ([first]: Array<number>): number => first;

console.log("The first item of the array is: ", head(testArray));

console.log("%c Exercise 2: Tail", "color: green");

const tail = (first: number = 0, ...rest: Array<number>): Array<number> => rest;

console.log("The tail of the array is: ", tail(...testArray));

console.log("%c Exercise 3: Init", "color: green");

const init = (array: Array<number>): Array<number> => array.slice(0, array.length-1);

console.log("The array without the last element is: ", init(testArray));

console.log("%c Exercise 4: Last", "color: green");

const last = (array: Array<number>): number => array[array.length-1];

console.log("The last item of the array is: ", last(testArray));

console.groupEnd();
