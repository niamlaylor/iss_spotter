const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = require('./printPassTimes'); // Function that's just for printing the final data

/* This calls the main function from iss_promised.js that chains all of the other functions 
together, then passes the result into the printPassTimes function to be printed.
*/
nextISSTimesForMyLocation()
  .then((passTimes) => { // If the nextISSTimesForMyLocation function returns a body, then we want to pass it into the print function to console.log them all.
    printPassTimes(passTimes);
  })
  .catch((error) => { // This scenario captures an error at any point along the chain of promises and logs the error message.
    console.log('Uh oh, there was an error: ', error.message)
  });