const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');
/*
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
*/
fetchISSFlyOverTimes({ latitude: '48.435842', longitude: '-123.4112341' }, (error, times) => {
  if (error) {
    console.log('There was an error fetching the pass times: ', error);
    return;
  } else {
    console.log('We got the pass times: ', times);
  }
});