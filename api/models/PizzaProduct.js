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

const PizzaProduct = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    title:{
      type: String,
      required: [true, "Please enter product title"],
    },
    img: {
      type: String,
      required: [true, "Please enter product img"],
    },
    reviews: [ReviewSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PizzaCategory",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
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

const Pizza = mongoose.model("PizzaProduct", PizzaProduct);
module.exports = Pizza;
