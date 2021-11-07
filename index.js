const results = { };

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
// run both function at same time and return the first to response always caching the new value
function memoize(func) {
    return (...args) => {
        const argsKey = JSON.stringify(args);
        return Promise.any([cache_retrieve(argsKey) , func(args)]).then(value=>{
            cache_store(argsKey, value)
            return value
        })
    };
};

// slow function that creates an object with all the rooms in the hotel with a title
async function slow_function(input){
    const allRooms = [];
    for(let i =1; i<=input;i++){
        allRooms.push({
            title: 'Room #'+i
        })
    }
    return allRooms;
};

// another slow function that calculates the square of the number just as example
async function  slow_function_other (num) {
    let result = 0;
    for (let i = 1; i <= num; i++) {
      for (let j = 1; j <= num; j++) {
        result++;
      }
    }
    return result;
  };


// the first and the second call to slow_function are called at the same time so the first one doesn't have the time to cache 
// the response so both take the same amount of time
const inputTimes = 20;
console.time("First call");
memoize(slow_function)(inputTimes).then(value => {
    console.log(value)
    console.timeEnd("First call");
})

console.time("Second call");
memoize(slow_function)(inputTimes).then(value => {
    console.log(value)
    console.timeEnd("Second call");
})


// this time the first called had the time to cache the response so the amount of time in the third and fourth called are notorious dicreased

setTimeout(()=>{
    console.time("Third call");
    memoize(slow_function)(inputTimes).then(value => {
        console.log(value)
        console.timeEnd("Third call");
    })
    console.time("Fourth call");
    memoize(slow_function)(inputTimes).then(value => {
        console.log(value)
        console.timeEnd("Fourth call");
    })
},1000)

// function to watch cache
// setTimeout(function(){console.log(results)},inputTimes00)