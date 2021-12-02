const request = require('request');

const fetchMyIP = (callback) => {
  const url = 'https://api64.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // checking for non-200 status
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };