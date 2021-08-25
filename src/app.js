const path = require("path");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const express = require("express");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Alice", message: "Use this site to get your weather!"});
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Alice" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Help message",
    name: "Emily",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "Address must be provided." });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, dataForecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: dataForecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "alice",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Emily",
  });
});

app.listen(3000, () => console.log("Server listen at port 3000"));
