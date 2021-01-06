// import in node
const express = require("express");
const dotenv = require('dotenv')
const server = express();
const axios = require('axios')
dotenv.config()
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJWQk4cPY8TIYRA7pjwdGTwZY&fields=user_ratings_total&key=${process.env.API_KEY}`

server.use(express.json());

server.get("/", (req, res) => {
  axios.get(url)
    .then(count => {
      res.json({number: count.data.result.user_ratings_total});
    })
    .catch(err => {
      console.log("error on GET count", err);
      res
        .status(500)
        .json({ errorMessage: "error getting count" });
    });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`/n API running on port ${port} /n`));