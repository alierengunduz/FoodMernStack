const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pizza = require('../models/PizzaProduct');


// Middleware olarak kullanılacak kontrol fonksiyonunu tanımlıyoruz
const isValidObjectId = (req, res, next) => {
    const PizzaId = req.params.PizzaId;
    if (!mongoose.Types.ObjectId.isValid(PizzaId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    next();
};


//create
router.post('/',async(req,res) => {
    try {
        const newPizza = new Pizza(req.body);
        const savedPizza = await newPizza.save();
        res.status(201).json(savedPizza);
    } catch (error) {
        console.log(error);
    }
})



// read-All
router.get('/', async (req, res) => {
    try {
        const Pizzas = await Pizza.find();
        res.status(200).json(Pizzas);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
} );

// read-One
router.get('/:PizzaId', isValidObjectId, async (req, res) => {
    const pizza = await Pizza.findById(req.params.PizzaId);
    if (!pizza) return res.status(404).json({message: "Pizza not found"});
    try {
        res.status(200).json(pizza);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// update
router.put('/:PizzaId', isValidObjectId, async (req, res) => {
    const pizza = await Pizza.findById(req.params.PizzaId);
    if (!pizza) return res.status(404).json({message: "Pizza not found"});
    try {
        const updatedPizza = await Pizza.findByIdAndUpdate(pizza, req.body, { new: true });
        res.status(200).json(updatedPizza);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// delete
router.delete('/:PizzaId', isValidObjectId, async (req, res) => {
    const pizza = await Pizza.findById(req.params.PizzaId);
    if (!pizza) return res.status(404).json({message: "Pizza not found"});
    try {
        await Pizza.findByIdAndDelete(pizza);
        res.status(200).json({message: "Pizza deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});




module.exports = router;