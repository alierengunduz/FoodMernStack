const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema({
    // courpon code
    code: {
        type: String,
        required: true,
    },
    // indirim oranı
    discountPercent:{
        type: Number,
        required: true,
    }
}, {timestamps: true});


const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;