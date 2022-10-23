const { fetchMyIp, fetchCoordsByIp } = require('./iss');

fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work 😡:" , error);
    return;
  }
  console.log('It worked 😎: Returned IP:' , ip);
});


fetchCoordsByIp("24.69.216.126", (error, data) => {
  if (error) {
    console.log('There was an error 😡: ', error);
    return;
  } else {
    console.log('It worked 😎: ', data);
  }
});
