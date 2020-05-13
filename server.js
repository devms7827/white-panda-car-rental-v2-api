//main server.js file

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Creating connection with database (mongoDb) with the help of mongoose
// NOTE: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

// Connecting routes for rest api's
const carsRouter = require("./routes/cars");
app.use("/cars", carsRouter);

// Connecting the port and displaying message
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
