const request = require('request-promise-native');

// function to fetch IP
const fetchMyIP = function() {
  return request('https://api64.ipify.org?format=json');
};

// function to fetch coords by IP
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

// function to fetch fly times
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

// function for fly times for location
const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((flyTimes) => {
    const { response } = JSON.parse(flyTimes);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };

