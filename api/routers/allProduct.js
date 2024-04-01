const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AllProduct = require('../models/AllProduct');


// Middleware olarak kullanılacak kontrol fonksiyonunu tanımlıyoruz
const isValidObjectId = (req, res, next) => {
    const AllProductId = req.params.AllProductId;
    if (!mongoose.Types.ObjectId.isValid(AllProductId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    next();
};


//create
router.post('/',async(req,res) => {
    try {
        const newPizza = new AllProduct(req.body);
        const savedPizza = await newPizza.save();
        res.status(201).json(savedPizza);
    } catch (error) {
        console.log(error);
    }
})



// read-All
router.get('/', async (req, res) => {
    try {
        const Pizzas = await AllProduct.find();
        res.status(200).json(Pizzas);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
} );

// read-One
router.get('/:AllProductId', isValidObjectId, async (req, res) => {
    const allProduct = await AllProduct.findById(req.params.AllProductId);
    if (!allProduct) return res.status(404).json({message: "All product not found"});
    try {
        res.status(200).json(allProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// update
router.put('/:AllProductId', isValidObjectId, async (req, res) => {
    const allProduct = await AllProduct.findById(req.params.AllProductId);
    if (!allProduct) return res.status(404).json({message: "All product not found"});
    try {
        const updatedPizza = await AllProduct.findByIdAndUpdate(allProduct, req.body, { new: true });
        res.status(200).json(updatedPizza);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// delete
router.delete('/:AllProductId', isValidObjectId, async (req, res) => {
    const allProduct = await AllProduct.findById(req.params.AllProductId);
    if (!allProduct) return res.status(404).json({message: "All product not found"});
    try {
        await AllProduct.findByIdAndDelete(allProduct);
        res.status(200).json({message: "All product deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});




module.exports = router;