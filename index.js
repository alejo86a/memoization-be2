const results = { '[100]': 'hola' };
// const results = { };
// stores data (value) by key
async function cache_store(key, value) {
    results[key] = value;
}
// retrieves data by key (if it exists)
async function cache_retrieve(key) {
    const retrieve = results[key];
    if(!retrieve){
        return Promise.reject(0);
    }
    return retrieve;
}

function memoize(func) {
    return (...args) => {
      const argsKey = JSON.stringify(args);
      console.log('entre aqui')
      Promise.any([cache_retrieve(argsKey) , func(args)]).then(value => {
          console.log('vavavalue', value)
          cache_store(argsKey, value)
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
const m = memoize(slow_function)(100)
console.log(m)
console.timeEnd("First call");




// console.time("Second call");
// console.log(memoize(slow_function(100)));
// console.timeEnd("Second call");

// setTimeout(function(){console.log(results)},2000)