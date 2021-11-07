const results = {};
const memoize = (func) => {
    return (...args) => {
      const argsKey = JSON.stringify(args);
      if (!results[argsKey]) {
        results[argsKey] = func(...args);
      }
      return results[argsKey];
    };
  };

const getAllRooms = memoize((total) =>{
    const allRooms = [];
    for(let i =1; i<=total;i++){
        allRooms.push({
            name: 'Room #'+i
        })
    }
    return allRooms;
})

// stores data (value) by key
async function cache_store(key, value) {
}
// retrieves data by key (if it exists)
async function cache_retrieve(key) {
}
// fetches data from a slow data source
async function slow_function(input) {
    return getAllRooms(input);
}

// runs faster than slow_function by using cache functions
// function memoize(slow_function) {
//     return fast_function;
// }


  
const fast_function = (num) => memoize(slow_function(num));


  console.time("First call");
  console.log(getAllRooms(100));
  console.timeEnd("First call");

  console.time("Second call");
  console.log(getAllRooms(100));
  console.timeEnd("Second call");