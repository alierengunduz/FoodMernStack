const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Burger = require('../models/BurgerProduct');


// Middleware olarak kullanılacak kontrol fonksiyonunu tanımlıyoruz
const isValidObjectId = (req, res, next) => {
    const BurgerId = req.params.BurgerId;

    if (!mongoose.Types.ObjectId.isValid(BurgerId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    next();
};


//create
router.post('/',async(req,res) => {
    try {
        const newBurger = new Burger(req.body);
        const savedBurger = await newBurger.save();
        res.status(201).json(savedBurger);
    } catch (error) {
        console.log(error);
    }
})



// read-All
router.get('/', async (req, res) => {
    try {
        const Burgers = await Burger.find();
        res.status(200).json(Burgers);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
} );

// read-One
router.get('/:BurgerId', isValidObjectId, async (req, res) => {
    const burger = await Burger.findById(req.params.BurgerId);
    if (!burger) return res.status(404).json({message: "Burger not found"});
    try {
        res.status(200).json(burger);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// update
router.put('/:BurgerId', isValidObjectId, async (req, res) => {
    const burger = await Burger.findById(req.params.BurgerId);
    if (!burger) return res.status(404).json({message: "Burger not found"});
    try {
        const updatedBurger = await Burger.findByIdAndUpdate(burger, req.body, { new: true });
        res.status(200).json(updatedBurger);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// delete
router.delete('/:BurgerId', isValidObjectId, async (req, res) => {
    const burger = await Burger.findById(req.params.BurgerId);
    if (!burger) return res.status(404).json({message: "Burger not found"});
    try {
        await Burger.findByIdAndDelete(burger);
        res.status(200).json({message: "Burger deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});




module.exports = router;