// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

// Function to print passing times
const printPassingTimes = function(passTimes) {
  for (const pass of passTimes) {
    const date = new Date(0); // => sets a new date
    date.setUTCSeconds(pass.risetime); // => conv
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation()
.then(flyingTimes => {
  printPassingTimes(flyingTimes)
})
.catch((error) => {
  console.log("It didn't work: ", error.message)
})

// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));
