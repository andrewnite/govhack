var request = require('request');
// request('http://54.68.247.247:3000/random_park', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
//   var park = JSON.parse(body);
//   var speechOutput = "I suggest you visit the " + park.name + " in " + park.suburb + ". ";
//   speechOutput = !park.facilities ? speechOutput : speechOutput + "This park includes facilities for " + park.facilities + ". ";
//   console.log(speechOutput);
// });

request.post('http://54.68.247.247:3000/events', {form:{name:'Here is a test event'}}, 
  function(error, response, body)
  { 
    console.log("Thanks for creating an event!"); 
  });

// request('http://54.68.247.247:3000/events', function (error, response, body) {
//   if (response && response.statusCode == 200) {
//     var events = JSON.parse(body);
//     var eventDescriptions = events.filter(e => e.name).map((e, i) => "Event " + (i + 1) + ". " + e.name);
//     var speechOutput = "Here are the meetup events on the calendar today. " + eventDescriptions.join(". ");
//     console.log(speechOutput);
//   } else {
//     console.log(error);
//   }
// });