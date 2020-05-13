//Database Schema for cars - (Mongoose)

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    imgSrc: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
    },
    color: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    carType: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    engine: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 10,
    },
    seater: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      min: 1,
    },
    rentPerDay: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      min: 1,
    },
    available: {
      type: Boolean,
      required: true,
    },
    currentBooking: {
      name: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
      },
      mobile: {
        type: Number,
        required: false,
        unique: false,
        trim: true,
        minlength: 12, // 91<10 digit mobile number>
      },
      issueDate: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
      },
      returnDate: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
