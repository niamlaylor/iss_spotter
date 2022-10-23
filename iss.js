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

module.exports = { fetchMyIp, fetchCoordsByIp };