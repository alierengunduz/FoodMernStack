const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BurgerCategory = require("../models/BurgerCategory");

// Middleware olarak kullanılacak kontrol fonksiyonunu tanımlıyoruz
const isValidObjectId = (req, res, next) => {
  const categoryId = req.params.categoryId;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  next();
};

//create
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = await BurgerCategory.create({ name, img });
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// read-All
router.get("/", async (req, res) => {
  try {
    const categories = await BurgerCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// read-One
router.get("/:categoryId", isValidObjectId, async (req, res) => {
  const category = await BurgerCategory.findById(req.params.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });
  try {
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// update
router.put("/:categoryId", isValidObjectId, async (req, res) => {
  const category = await BurgerCategory.findById(req.params.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });
  try {
    const updatedCategory = await BurgerCategory.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete
router.delete("/:categoryId", isValidObjectId, async (req, res) => {
  const category = await BurgerCategory.findById(req.params.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });
  try {
    await BurgerCategory.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
