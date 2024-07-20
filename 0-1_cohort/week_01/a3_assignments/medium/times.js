/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    let start = performance.now();
    let sum = 0;
    for (let index = 1; index <= n; index++) {
        sum += index;
    }
    let end = performance.now();
    return end - start;
}

console.log("computation time for 100 is : " + calculateTime(100));
console.log("computation time for 100000 is : " + calculateTime(100000));
console.log("computation time for 1000000000 is : " + calculateTime(1000000000));