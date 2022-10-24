const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = require('./printPassTimes'); // Function that's just for printing the final data

/* This calls the main function from iss_promised.js that chains all of the other functions 
together, then passes the result into the printPassTimes function to be printed.
*/
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('Uh oh, there was an error: ', error.message)
  });