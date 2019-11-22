console.group("2. CONCAT");

const array1: Array<number> = [1,5,3,1,2,1,0];
const array2: Array<string> = ["a", "b", "c", "d", "e", "f", "g"];

console.log("The arrays used for examples purpouses is: ", array1, " and ", array2);


const concat = <T> (a: Array<T>, b: Array<T>): Array<T> => [...a, ...b];

console.log("The concatenated array is: ", concat<string|number>(array1, array2));

const array3: Array<number> = [6,7,2,1,4,34,44,2];
const array4: Array<string> = ["h", "i", "j", "k", "l", "m"];

const concatMorethanTwo = <T>(...args: Array<T>): Array<T> => [...args];

console.log("The result of four concatenated arrays is: ", concatMorethanTwo<string|number>(...array1, ...array2, ...array3, ...array4));

console.groupEnd();