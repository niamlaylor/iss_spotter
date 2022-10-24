const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIp = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip); // 200 response code and no errors
  });
};

/* Takes in an ip and returns coordinates via API request, formatted as an object with two properties: latitude and longitude
e.g. { latitude: '48.435842', longitude: '-123.4112341' }
*/
const fetchCoordsByIp = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching lat/lon: ${body}`), null);
    }
    const parsed = JSON.parse(body);
    const data = { latitude: parsed.latitude, longitude: parsed.longitude };
    if (!parsed.success) {
      callback(Error(`Success status was: ${parsed.success}. Server message says: ${parsed.message} when fetching for IP ${parsed.ip}.`), null);
      return;

    } else {
      callback(null, data);
    }
  });
};

/* Takes in coordinates (latitude and longitude) via a single API request and returns dates and duration of upcoming ISS pass times, formatted as an array of objects.
e.g. 
[
  { risetime: 1666656877, duration: 356 },
  { risetime: 1666693277, duration: 543 },
  { risetime: 1666729677, duration: 639 },
  { risetime: 1666766077, duration: 180 },
  { risetime: 1666802477, duration: 495 }
]
*/
const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const parsed = JSON.parse(body).response;
    callback(null, parsed);
  });
};

/* Takes in all above functions as callbacks and passes the pass times and durations to the function in index.js to be printed.
*/
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, times);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };