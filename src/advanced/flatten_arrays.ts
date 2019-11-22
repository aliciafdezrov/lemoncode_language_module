console.group("ADVANCED 1. APLANANDO ARRAYS");

console.log("APARTADO A Y B");

const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];

console.log("The original array is: ", sample);

const recursiveFlattenArray = (() => {
    const flatArray: Array<number> = [];
    const innerFlattenArray = <T>(array : Array<T>) : Array<number> => {
        for (let i = 0; i < array.length; i++) {
            let arrayItem: any = array[i];
            if (!arrayItem.length) flatArray.push(arrayItem);
            else innerFlattenArray(arrayItem);
        }
        return flatArray;
    };

    return <T>(array: Array<T>) => innerFlattenArray(array);
})();

console.log("The flatten array is: ", recursiveFlattenArray(sample));

console.groupEnd();
