const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0377a9c1bbd5c6d6e2d0edd157a7b208&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  //customize HTTP request, JSON 必须小写！   // changed {body} to {body} = {}
  // TypeError: Cannot destructure property 'body' of 'undefined' as it is undefined.
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;
      const today =
        body.current.weather_descriptions[0] +
        ". It is currently " +
        temperature +
        " degrees out. It feels like " +
        feelslike +
        " degrees out.";
      callback(undefined, today);
    }
  });
};

module.exports = forecast;
