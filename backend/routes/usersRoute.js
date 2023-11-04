const router = require('express').Router();
const User = require("../models/userModel.js")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware.js');




router.post('/register', async (req, res) => {
    try {

        // cheaking if user already exists or not // 

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error('user already exists')
        }

        // creating new user // 

        // hash password // 

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpassword;

        // save user // 

        const newuser = new User(req.body);
        await newuser.save();
        res.send({
            success: true,
            message: 'user created successfully',
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});


router.post('/login', async (req, res) => {
    try {

        // cheaking if user exists or not // 

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('user not found')
        }

        // if user is active
        if (user.status !== "active") {
            throw new Error("The user account is blocked , please contact admin");
        }

        // compare password // 

        const validpassword = await bcrypt.compare(req.body.password, user.password);

        if (!validpassword) {
            throw new Error("Invalid Password")
        }


        // create and assign token // 


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRECT, { expiresIn: "1d" });

        res.send({
            success: true,
            message: 'user logged in successfully',
            data: token
        });

    } catch (error) {


        res.send({
            success: false,
            message: error.message
        })
    }
});


// get current user // 


router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        res.send({
            success: true,
            data: user,
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
})

// get all users
router.get("/get-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


// update user status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "User status updated successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


module.exports = router;