import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import User from "../models/userModel.js";


const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};

// @desc:       register user
// @route:      post /api/users
// @access:     Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please, fill all fields!"
        })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const docUser = await new User({
        name,
        email,
        password: hashedPassword
    })

    // save user
    const newUser = await docUser.save()

    if (newUser) {
        res.status(201).json({
            message: "User was created !",
            user: newUser,
            token: generateJWT(newUser._id)
        })
    } else {
        return res.status(400).json({
            message: "Invalid user data"
        })
    }


    // throw new Error('exception')
})


// @desc:       register user
// @route:      post /api/users
// @access:     Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && bcrypt.compare(password, user.password)) {
            res.status(200).json({
                message: "You loged in !",
                user,
                token: generateJWT(user._id)
            })
        } else {
            res.status(400).json({
                message: "Invalid credentials"
            })
            throw new Error("Invalid credentials!")
        }


    } catch (error) {
        return res.status(403).json({
            message: "Error, cannot log in"
        })
    }
})


// @desc:       get auth me
// @route:      get /api/users
// @access:     Private
export const getMe = expressAsyncHandler(async (req, res) => {

    try {
        res.status(200).json({
            message: "Hi, it's me !"
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error"
        })
    }
});