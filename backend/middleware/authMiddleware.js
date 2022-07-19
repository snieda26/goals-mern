import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protectAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        console.log(req.headers.authorization)
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //                                         use  .select('-*')  to avoid some prop.
            const testUser = await User.findById(decoded.id).select('-password')
            req.user = await User.findById(decoded.id).select('-password')
            console.log(`user: ${JSON.stringify(testUser)}`.bgBlue)
            next()
        } catch (error) {
            console.warn(error)
            res.status(401).json({
                message: "Not autorized"
            })
            throw new Error("Not authorized")
        }
    }
};

export default protectAuth;