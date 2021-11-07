const results = {};
// stores data (value) by key
async function cache_store(key, value) {
    results[key] = value;
}
// retrieves data by key (if it exists)
async function cache_retrieve(key) {
    return results[key];
}
function memoize(func) {
    return (...args) => {
      const argsKey = JSON.stringify(args);
      console.log('entre aqui')
      Promise.race([cache_retrieve(argsKey) , func]).then((value) => {
        cache_store(argsKey, value)
        console.log('value', value)
        return value;
      });
    };
  };

  async function slow_function(input){
    console.log('entre aca')
    const allRooms = [];
    for(let i =1; i<=input;i++){
        allRooms.push({
            name: 'Room #'+i
        })
    }
    return allRooms;
};


console.time("First call");
console.log(memoize(slow_function(100)))
console.timeEnd("First call");




console.time("Second call");
console.log(memoize(slow_function(100)));
console.timeEnd("Second call");