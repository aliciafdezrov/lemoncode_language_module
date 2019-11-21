console.log("----> 1. APLANANDO ARRAYS");

const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];

const recursiveFlattenArray = (() => {
    const flatArray = [];
    const innerFlattenArray = (array) => {
        for (let i = 0; i< array.length; i++) {
            if (!array[i].length) flatArray.push(array[i]);
            else innerFlattenArray(array[i]);
        }
        return flatArray;
    };

    return (array) => innerFlattenArray(array);
})();

console.log(recursiveFlattenArray(sample));
