const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxpY2UyMDIxIiwiYSI6ImNrc2J3Z3VrNjBhdWUydW8yb2FxYmR3M3cifQ.elcuATGqCej_LePLGWtC6w&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (!body.features || !body.features.length) {
      callback("Location not found.", undefined);
    } else {
      const coordinate = body.features[0].center;
      callback(undefined, {
        latitude: coordinate[1],
        longitude: coordinate[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
