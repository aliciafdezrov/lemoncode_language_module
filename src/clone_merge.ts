console.group("3. CLONE MERGE");

console.log("%c Exercise 1: Clone", "color:green");

console.group("Simple Clone");

let obj1: object = {
    name: "Corsa",
    brand: "Opel",
    wheels: 4
};

console.log("The object used for example purpouse is: ", obj1);

function clone(source: object): object {
    return {...source};
}


let copyOfObject1: object = clone(obj1);

console.log("The copy of the object is: ", copyOfObject1);
console.log("The two objects are the same: ", copyOfObject1 === obj1);
console.log("...but the copy has the same properties as the original: ", copyOfObject1["name"] === obj1["name"]);
console.groupEnd();

console.group("Deep Clone");
const deepClone = (() => {
    const innerDeepClone = (source: object) => {
        let copy = {};
        for(let prop in source) {
            if(source[prop] instanceof Object) copy[prop] = innerDeepClone(source[prop]);
            else copy[prop] = source[prop];
        }
        return copy
    };

    return (source: object) => innerDeepClone(source);
})();

const deepObject: object = {
    a: 1,
    b: {
        c: null,
        d: {
            e: 3,
            f: {
                g: "bingo",
            } }
    } };

let deepObjectClone: object = deepClone(deepObject);

console.log(deepObjectClone);

console.log("The copy of the deep object is: ", deepObjectClone);
console.log("The two objects are the same: ", deepObjectClone === deepObject);
console.log("...but the properties of the copy are equal to the original properties: ", copyOfObject1["a"] === obj1["a"]);
console.log("...if the property is an object, the property of the copy is the same object: ", deepObject["b"] === deepObjectClone["b"]);
console.groupEnd();

console.log("%c Exercise 2: Merge", "color: green");

const a: object = {name: "Maria", surname: "Ibañez", country: "SPA"};
const b: object = {name: "Luisa", age: 31, married: true};

console.log("The object a is: ", a);
console.log("The object b is: ", b);

function merge(source: object, target: object): object {
    return {...target, ...source}
}

console.log("The result of the merge of a and b objects is: ", merge(a, b));

console.groupEnd();