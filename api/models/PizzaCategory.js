const mongoose = require("mongoose");

const pizzaCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter category name"],
    },
    img: {
      type: String,
      required: [true, "Please enter category image"],
    },
  },
  {
    timestamps: true,
  }
);


const PizzaCategory = mongoose.model("PizzaCategory", pizzaCategorySchema);
module.exports = PizzaCategory;