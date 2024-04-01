const mongoose = require("mongoose");

const burgerCategorySchema = new mongoose.Schema(
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


const BurgerCategory = mongoose.model("BurgerCategory", burgerCategorySchema);
module.exports = BurgerCategory;