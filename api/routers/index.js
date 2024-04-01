const express = require('express');
const router = express.Router();


const pizzaproduct = require('./pizzaproduct.js');
const burgerproduct = require('./burgerproduct.js');
const pizzaCategoryRoute = require('./pizzacategories.js');
const burgerCategoryRoute = require('./burgercategories.js');
const authRoute = require('./auth.js');
const couponRoute = require('./coupons.js');
const userRoute = require('./users.js');
const allProductRoute = require('./allProduct.js');
const startCategoryRoute = require('./startCategories.js');

router.use('/pizzacategories', pizzaCategoryRoute);
router.use('/burgercategories', burgerCategoryRoute);
router.use('/pizzaproduct', pizzaproduct);
router.use('/burgerproduct', burgerproduct);
router.use('/auth', authRoute);
router.use('/coupons', couponRoute);
router.use('/allProduct', allProductRoute);
router.use('/users', userRoute);
router.use('/startCategories', startCategoryRoute);

module.exports = router;