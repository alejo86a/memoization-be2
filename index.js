// stores data (value) by key
async function cache_store(key, value) {
}
// retrieves data by key (if it exists)
async function cache_retrieve(key) {
}
// fetches data from a slow data source
async function slow_function(input) {
}

// runs faster than slow_function by using cache functions
function memoize(slow_function) {
    return fast_function;
}