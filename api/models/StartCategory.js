const mongoose = require("mongoose");


const startCategorySchema = new mongoose.Schema(
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
  
  
  const StartCategory = mongoose.model("startCategory", startCategorySchema);
  module.exports = StartCategory;