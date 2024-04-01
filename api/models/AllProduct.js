const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter review text"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter review rating"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
},{timestamps:true});

const AllProducts = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter product name"],
    },
    type:{
      type: String,
      required: [true, "Please enter product title"],
    },
    Name:{
      type: String,
    },
    img: {
      type: String,
      required: [true, "Please enter product img"],
    },
    reviews: [ReviewSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "startCategory",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    extras: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    price: {
      current: {
        type: Number,
        required: [true, "Please enter product price"],
      },
      discount: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const AllProduct = mongoose.model("allproduct", AllProducts);
module.exports = AllProduct;
