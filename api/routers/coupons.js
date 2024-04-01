const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const mongoose = require("mongoose");

// Middleware olarak kullanılacak kontrol fonksiyonunu tanımlıyoruz
const isValidObjectId = (req, res, next) => {
    const couponId = req.params.couponId;

    if (!mongoose.Types.ObjectId.isValid(couponId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    next();
};


//create
router.post("/", async (req, res) => {
  try {
    const {code} = req.body;
    const existingCoupon = await Coupon.findOne({code})
    if (existingCoupon) return res.status(400).json({message: "Coupon already exists"});
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// read-All
router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
} );

// read-One ID
router.get('/:couponId', isValidObjectId, async (req, res) => {
    const coupon = await Coupon.findById(req.params.couponId);
    if (!coupon) return res.status(404).json({message: "Coupon not found"});
    try {
        res.status(200).json(coupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// read-One code
router.get('/code/:couponCode', async (req, res) => {
   try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({code: couponCode});
    if (!coupon) return res.status(404).json({message: "Coupon not found"});
    const {discountPercent} = coupon;
    res.status(200).json({discountPercent:discountPercent});
   } catch (error) {
     console.log(error);
        res.status(500).json({ message: "Server Error" });
   }
});


// update
router.put('/:couponId', isValidObjectId, async (req, res) => {
    const coupon = await Coupon.findById(req.params.couponId);
    if (!coupon) return res.status(404).json({message: "Coupon not found"});
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(coupon, req.body, { new: true });
        res.status(200).json(updatedCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// delete
router.delete('/:couponId', isValidObjectId, async (req, res) => {
    const coupon = await Coupon.findById(req.params.couponId);
    if (!coupon) return res.status(404).json({message: "Coupon not found"});
    try {
        await Coupon.findByIdAndDelete(coupon);
        res.status(200).json({message: "Coupon deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});







module.exports = router;
