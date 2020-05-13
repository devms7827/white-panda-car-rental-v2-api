//Database Schema for car booking - (Mongoose)

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carBookedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    mobile: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      minlength: 12, // 91<10 digit mobile number>
    },
    issueDate: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    returnDate: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const BookCar = mongoose.model("BookCar", carBookedSchema);

module.exports = BookCar;
