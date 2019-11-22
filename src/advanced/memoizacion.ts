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
        if(cache.get(funcKey) !== undefined) {
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