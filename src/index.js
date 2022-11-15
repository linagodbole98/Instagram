const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer")
const app = express();
const dotenv= require("dotenv")
const route = require("./route/routes")


dotenv.config();

//------------------- Global or Application level Middleware-------------------//
app.use(bodyParser.json());
app.use(multer().any()); 
app.use(bodyParser.urlencoded({ extended: true }));

//  ------------------- Connection Establishment Between Application and Database -------------------//
mongoose.connect("mongodb+srv:linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/Instagram",
    { useNewUrlParser: true,})
  .then(() => console.log("MongoDb is connected!"))
  .catch((err) => console.log(err));
  

 //  --------middleware---------- 
app.use(express.json());


app.use("/", route);



app.use("*", (req, res) => {
  return res
    .status(400)
    .send({ status: false, message: "please enter valid url endpoint" });
});

//------------------- Server Configuration -------------------//

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});



