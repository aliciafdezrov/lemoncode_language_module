const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
};

console.group("ADVANCED 5. MEMOIZACIÓN");
console.log("%c APARTADO A: ", 'color: green');

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

console.log("%c APARTADO B: ", 'color: green');

const cacheAPI = (func: () => any) => {
    const cache = new WeakMap();
    const key = {name};

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

const memoizeInOneLine = (func, cache = cacheAPI(func)) => () => cache.getCacheItem() !== undefined ? cache.getCacheItem() : cache.setCache();

const memoizedInOneLine = memoizeInOneLine(expensiveFunction);
console.log(memoizedInOneLine());
console.log(memoizedInOneLine());
console.log(memoizedInOneLine());

console.log("%c APARTADO C: ", 'color: green');

let count = 0; // Comprobacion de no de ejecuciones
const repeatText = (repetitions: number, text: string): string => (count++, `${text} `.repeat(repetitions).trim());

interface KeyWithArguments {
    name: string;
    arguments: Array<string | number | boolean>;
}

interface KeyAPI {
    getKey: () => KeyWithArguments;
    setKeyName: (name: string) => void;
    setKeyArgs: (args: Array<number | string | boolean>) => void;
}

const keyAPI = (): KeyAPI => {
    const key: KeyWithArguments = {name: "", arguments: []};

    return {
        getKey: function <T>(): KeyWithArguments {
            return key;
        },

        setKeyName: function (name: string): void {
            key.name = name;
        },

        setKeyArgs: function (args: Array<number | string | boolean>): void {
            key.arguments = args;
        }
    }
};

interface CacheAPI<T> {
    setCache: (key: KeyWithArguments) => T;
    getValueFromCache: (key: KeyWithArguments) => Array<number | string | boolean>;
    hasCacheThisItem: (key: KeyWithArguments) => KeyWithArguments;
}

const cacheAPI2 = <T>(func: (args?) => T): CacheAPI<T> => {
    const cache: Map<KeyWithArguments, T> = new Map<KeyWithArguments, T>();

    return {
        setCache: function <T>(key: KeyWithArguments): T {
            let value = func(...key.arguments);
            cache.set(key, value);
            return this.getValueFromCache(key);
        },

        getValueFromCache: function<T>(key: KeyWithArguments): T {
            return cache.get(key) as any;
        },

        hasCacheThisItem: function (key: KeyWithArguments): KeyWithArguments {
            let cacheItem: KeyWithArguments = null;

            if (cache.size) {
                cache.forEach((value, key1) => {
                    if (key1.name === key.name && key.arguments.length === key1.arguments.length) {
                        let elementsAreEqual: boolean = true;

                        for (let i: number = 0; i < key1.arguments.length && elementsAreEqual; i++) {
                            if (key.arguments[i] !== key1.arguments[i]) elementsAreEqual = false;
                        }

                        if (elementsAreEqual) cacheItem = key1;
                    }
                });
            }
            return cacheItem;
        }
    }
};

const memoizeWithArgs = <T>(func) => {
    const cache: CacheAPI<T> = cacheAPI2(func);

    return <T>(...args) => {
        const key: KeyAPI = keyAPI();
        key.setKeyName(func.name);
        key.setKeyArgs(args);
        let itemFromCache = cache.hasCacheThisItem(key.getKey());
        return itemFromCache !== null ? cache.getValueFromCache(itemFromCache) : cache.setCache(key.getKey());
    };
};

const memoizedGreet = memoizeWithArgs(repeatText);
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(count);                          // 2

console.groupEnd();

