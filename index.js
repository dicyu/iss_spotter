// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// Test Code to check for your IP
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work.", error);
//     return;
//   }
//     console.log("It worked! Returned IP:", ip);
//   });

// Test Code to check for latitude and longitude
// fetchCoordsByIP('99.244.173.50', (error, coords) => {
//   if (error) {
//     console.log("It didn't work.", error);
//     return;
//   }
//   console.log("It worked! Coordinates are:", coords)
// })

// Test Code to check for fly times/rising times for ISS
// const currentCoords = { latitude: '43.879', longitude: '-79.2638' };
// fetchISSFlyOverTimes(currentCoords, (error, flying) => {
//   if (error) {
//     console.log("It didn't work.", error);
//     return;
//   }
//   console.log("It worked!", flying);
// });


// Function to pull everything together
const printPassingTimes = function(passTimes) {
  for (const pass of passTimes) {
    const date = new Date(0); // => sets a new date
    date.setUTCSeconds(pass.risetime); // => conv
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassingTimes(passTimes);
});