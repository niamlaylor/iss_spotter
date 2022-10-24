const request = require('request-promise-native');
/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIp = function() {
  return request('https://api.ipify.org/?format=json');
};

/*
 * Parses the IP addressed requested before it, then requests geo-data based on the user's ip address
 * Input: body from the fetchMyIp function
 * Returns: Promise of request for geo-data based on IP, returned as JSON string
 */
const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

/*
 * Parses the geo-data from fetchCoordsByIp and then requests ISS flyover data based on coordinates
 * Input: body with geo-data from the fetchMyCoordsByIp function
 * Returns: Promise of request for ISS flyover data based on lat/lon coordinates, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const parsedTimes = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${parsedTimes.latitude}&lon=${parsedTimes.longitude}`)
};

/*
 * Links all of the above functions together, passing the IP -> Coordinates -> Flyover times based on coordinates
 * Input: user's coordinates inputted as an object with properties for latitude and longitude
 * Returns: Upcoming flyover dates/times and duration based on the user's coordinates.
 * 
 * Note: This gets promised in index2.js to printPassTimes so it is printed in the console.
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = { nextISSTimesForMyLocation }; // By linking the functions together in this file, we only have to export one function