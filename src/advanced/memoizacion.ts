console.log("----> 5. MEMOIZACIÓN");

const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
};

console.log("APARTADO A: ");

const memoize = (func: () => any) => {
    const cache = new WeakMap();
    let funcKey = {name: func.name};

    return () => {
        if (cache.get(funcKey) !== undefined) {
            return cache.get(funcKey);
        } else {
            let funcValue = func();
            cache.set(funcKey, funcValue);
            return funcValue;
        }
    };
};

const memoized = memoize(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415

console.log("APARTADO B: ");

interface FuncType {
    name: string;
}

const cacheAPI = (func: () => any) => {
    const cache = new WeakMap();
    const key: FuncType = {name};

    return {
        setCache: function () {
            let value = func();
            cache.set(key, value);
            return value;
        },

        getCacheItem: function () {
            return cache.get(key);
        }
    }
};

const memoizeInOneLine = (func: () => any, cache = cacheAPI(func)) => () => cache.getCacheItem() !== undefined ? cache.getCacheItem() : cache.setCache();

const memoizedInOneLine = memoizeInOneLine(expensiveFunction);
console.log(memoizedInOneLine());
console.log(memoizedInOneLine());
console.log(memoizedInOneLine());

console.log("APARTADO C");

let count = 0; // Comprobacion de no de ejecuciones
const repeatText = (repetitions: number, text: string): string => (count++, `${text} `.repeat(repetitions).trim());

interface FuncTypeWithArguments {
    name: string;
    arguments: Array<any>;
}

const keyAPI = () => {
    const key: FuncTypeWithArguments = {
        name: null,
        arguments: null
    };

    return {
        getKey: function () {
            return key;
        },

        setKeyName: function (name: string) {
            key.name = name;
        },

        setKeyArgs: function (args: Array<any>) {
            key.arguments = args;
        }
    }
};

const cacheAPI2 = (func) => {
    const cache = new Map();

    return {
        setCache: function (key) {
            let value = func(...key.getKey().arguments);
            cache.set(key.getKey(), value);
            return value;
        },

        getItemFromCache: function(key) {
          return cache.get(key);
        },

        hasCacheThisItem: function (key) {
            let cacheItem = null;

            if (cache.size) {
                cache.forEach((value, key1) => {
                    if (key1.name === key.getKey().name && key.getKey().arguments.length === key1.arguments.length) {
                        let elementsAreEqual = true;
                        for(let i = 0; i < key1.arguments.length && elementsAreEqual; i++) {
                            if (key.getKey().arguments[i] !== key1.arguments[i]) elementsAreEqual = false;
                        }

                        if(elementsAreEqual) cacheItem = key1;
                    }
                });
            }
            return cacheItem;
        }
    }
};

const memoizeWithArgs = (func) => {
    const cache = cacheAPI2(func);
    const keys = Array<FuncTypeWithArguments>();

    return (...args) => {
        const key = keyAPI();
        key.setKeyName(func.name);
        key.setKeyArgs(args);
        let itemFromCache = cache.hasCacheThisItem(key);
        return itemFromCache !== null ? cache.getItemFromCache(itemFromCache) : cache.setCache(key);
    };
};

const memoizedGreet = memoizeWithArgs(repeatText);
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(count);                     // 2

