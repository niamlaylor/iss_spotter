const { nextISSTimesForMyLocation } = require('./iss');
/*
THIS COMMENTED OUT CODE WAS ADDED INCREMENTALLY AND EVENTUALLY REPLACED BY A SINGLE FUNCTION (NEXTISSTIMESFORMYLOCATION) AND USES HARDCODED DATA
fetchMyIp((error, ip) => {
  if (error) {
    console.log("There was an error fetching the IP address:" , error);
    return;
  }
  console.log('IP fetch worked 😎: Returned IP:' , ip);
});

fetchCoordsByIp("24.69.216.126", (error, data) => {
  if (error) {
    console.log('There was an error fetching the lat/lon: ', error);
    return;
  } else {
    console.log('Wer got the lat/lon: ', data);
  }
});

fetchISSFlyOverTimes({ latitude: '48.435842', longitude: '-123.4112341' }, (error, times) => {
  if (error) {
    console.log('There was an error fetching the pass times: ', error);
    return;
  } else {
    console.log('We got the pass times: ', times);
  }
});
*/


/* This function takes in the pass times and duration from nextISSTimesForMyLocation in iss.js file and prints the upcomign passes 
and how long it will be visible. Formatted with a more readable date syntax.
*/
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work! ", error);
  }
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});