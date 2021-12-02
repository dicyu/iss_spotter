const request = require('request');

const fetchMyIP = function(callback) {
  const urlIP = 'https://api64.ipify.org?format=json';
  request(urlIP, (error, response, body) => {
    if (error) 
      return callback(error, null);
    // checking for non-200 status
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body);
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const coordURL = `https://freegeoip.app/json/`;
  request(coordURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const issFlyURL = `https://iss-pass.herokuapp.com/json/?lat=43.879&lon=-79.2638`;
  request(issFlyURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching fly times. Response: ${body}`), null);
      return;
    }
    const flyTimes = JSON.parse(body).response;
    callback(null, flyTimes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flyTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyTimes);
      });
    });
  }); 
};

module.exports = { nextISSTimesForMyLocation };