const router = require("express").Router();

let Car = require("../models/cars.models");
let BookCar = require("../models/carBooked.models");

// HTTP GET Requests ===================================================================

// Request for fetching all the list of cars from the database for dashboard
router.route("/").get((req, res) => {
  const selection = {}; // For matching/finding some specific records

  const projection = {
    name: 1,
    imgSrc: 1,
    color: 1,
    seater: 1,
    rentPerDay: 1,
    available: 1,
  }; // For projecting required data only, no need to fetch all fields. This will reduce network/data load.

  //Query to find records based on selection and projecting selected data
  Car.find(selection, projection)
    .then((cars) =>
      res.json({
        status: 1,
        message: "Cars list fetched successfully!",
        payload: {
          list: cars,
        },
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

// Request for fetching all the details of a car based on the car _id/model id
router.route("/details/:id").get((req, res) => {
  // Finding or selecting record based on the selection of an id
  Car.findById(req.params.id)
    .then((car) =>
      res.json({
        status: 1,
        message: "Cars details fetched!",
        payload: car,
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

// HTTP POST Requests ===================================================================

// Request for storing/adding a new car into the cars database, can only be contacted via postman/insomnia
router.route("/add").post((req, res) => {
  // First fetch all the variables from the request body
  const name = req.body.name;
  const imgSrc = req.body.imgSrc;
  const vehicleNumber = req.body.vehicleNumber;
  const color = req.body.color;
  const carType = req.body.carType;
  const engine = req.body.engine;
  const description = req.body.description;
  const seater = Number(req.body.seater);
  const rentPerDay = Number(req.body.rentPerDay);
  const available = Boolean(req.body.available);
  const currentBooking = req.body.currentBooking;

  // Passing all the fetched body data to the Car model for data validation and then store the result in newCar variable
  const newCar = new Car({
    name,
    imgSrc,
    vehicleNumber,
    color,
    carType,
    engine,
    description,
    seater,
    rentPerDay,
    available,
    currentBooking,
  });

  // now save/insert/create the newCar document/object in the cars database
  newCar
    .save()
    .then(() =>
      res.json({
        status: 1,
        message: "Car added successfully!",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

// HTTP DELETE Requests =================================================================

// Request for deleting a car from the database based on the car _id
router.route("/delete/:id").delete((req, res) => {
  Car.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        status: 0,
        message: "Car deleted successfully!",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

// HTTP PATCH/UPDATE Requests ============================================================

// Request for booking a car based on the car _id/model id
router.route("/book/:id").patch((req, res) => {
  // First lets find the car exist or not, if not return error, if exists then fetch booking details and update that car
  Car.findById(req.params.id)
    .then((car) => {
      // Now fetch all the variables of booking details form from the request body
      const name = req.body.name;
      const mobile = Number(req.body.mobile);
      const issueDate = req.body.issueDate;
      const returnDate = req.body.returnDate;

      // Assign the booking details to car with key currentBooking
      car.currentBooking = {
        name,
        mobile,
        issueDate,
        returnDate,
      };
      car.available = false; // turning the availability to false

      // Update this car's details in the database
      car
        .save()
        .then(() => {
          res.json({
            status: 1,
            message: "Booking confirmed!",
          });
        })
        .catch((err) =>
          res.status(400).json({
            status: 0,
            message: "Error: " + err,
          })
        );
    })
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

// Request for deleting a booking for a car based on its _id/model id
router.route("/book/cancel/:id").patch((req, res) => {
  // First lets find the car exist or not, if not return error, if exists then fetch booking details and delete booking of that car
  Car.findById(req.params.id)
    .then((car) => {
      // Deleting the car booking details of this car only and not deleting the whole object
      //(so i used patch and not delete method)

      // setting undefined for currentBooking will not include this key while updating details, so booking will be discarded
      car.currentBooking = undefined;
      car.available = true; // turning the availability to true

      // Update this car's details in the database
      car
        .save()
        .then(() => {
          res.json({
            status: 1,
            message: "Booking cancelled!",
          });
        })
        .catch((err) =>
          res.status(400).json({
            status: 0,
            message: "Error: " + err,
          })
        );
    })
    .catch((err) =>
      res.status(400).json({
        status: 0,
        message: "Error: " + err,
      })
    );
});

module.exports = router;
