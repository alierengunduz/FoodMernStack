const exporess = require("express");
const router = exporess.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// avatar
const generateRandomAvatar = () => {
    const randomAvatar = Math.floor(Math.random() * 71);
    return `https://i.pravatar.cc/300?img=${randomAvatar}`;
}


// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: newPassword,
        avatar: generateRandomAvatar(),
    });
    const savedUser = await user.save();
     res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login",async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Invalid User" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid Password" });
    }
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    });

});




module.exports = router;
