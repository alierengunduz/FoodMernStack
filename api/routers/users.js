const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");




// read-All
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
} );

 // delete
router.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser  = await User.findOneAndDelete({email})
        if (!deletedUser) {
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
    }
    
});



module.exports = router;