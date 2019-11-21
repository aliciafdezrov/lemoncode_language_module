console.log("----> 2. ACCESO EN PROFUNDIDAD");
console.log("APARTADO A");

const myObject = {
    a: 1,
    b: {
        c: null,
        d: {
            e: 3,
            f: {
                g: "bingo",
            } }
    } };


const deepGet = (() => {
    const innerDeepGet = (obj, collection = [], index) => {
        if (!collection.length) return obj;
        else if (index === collection.length-1) return obj[collection[index]];
        else return innerDeepGet(obj[collection[index]], collection, index+1);
    };

    return (objectForSearching, ...propsSearcher) => innerDeepGet(objectForSearching, propsSearcher, 0);
})();

console.log(deepGet(myObject, "x")); // undefined
console.log(deepGet(myObject, "a")); // 1
console.log(deepGet(myObject, "b")); // { c: null, d: {....}}
console.log(deepGet(myObject, "b", "c")); // null
console.log(deepGet(myObject, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObject));  // {a: 1, b: {...}}


console.log("APARTADO B");

const myEmptyObject = {};


const deepSet = (() => {
    const innerDeepSet = (value: number, obj: object = {}, propsHierarchy: Array<string> = [], index: number) => {
        if (index === propsHierarchy.length) return  obj;
        else if (index === propsHierarchy.length-1) {
            obj[propsHierarchy[index]] = value;
            return obj;
        } else return obj[propsHierarchy[index]] = innerDeepSet(value, obj[propsHierarchy[index]], propsHierarchy, index+1);
    };

    return (value, myObject, ...propsHierarchy) => innerDeepSet(value, myObject, propsHierarchy, 0);
})();

deepSet(1, myEmptyObject, "a", "b");
console.log(JSON.stringify(myEmptyObject));  // {a: { b: 1}}
deepSet(2, myEmptyObject, "a", "c");
console.log(JSON.stringify(myEmptyObject));  // {a: { b: 1, c: 2}}
deepSet(3, myEmptyObject, "a");
console.log(JSON.stringify(myEmptyObject));  // {a: 3}
deepSet(4, myEmptyObject);
console.log(JSON.stringify(myEmptyObject));  // Do nothing // {a: 3}