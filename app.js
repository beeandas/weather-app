const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {
    console.log("Post request received");

    const query = req.body.cityName;
    const appKey = "015b8df3ac5507b8efdb36fc9f2fe3d4";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;

    https.get(url, (response) => {
        console.log("status Code: " + response.statusCode);
        response.on("data", (d) => {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temp in "+ query +" is : " + temp + "* celcius </h1>");
            res.write("<h2>The weather is currently : " + weatherDescription.toUpperCase() + " </h2>");

            res.write("<img src=" + imageUrl + ">");
            res.send();

        });
    })
})



app.listen(3000, () => {
    console.log("Server started at 3000");
})
