import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//  register function  API ENDPOINT = /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const existinguser = await User.findOne({ email })

        if (existinguser)
            return res.json({ success: false, message: 'User already exist' })
        const hashpassword = await bcrypt.hash(password, 10)
        // then create the user data 
        const user = await User.create({
            name,
            email,
            password: hashpassword
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,  //prevent js to access the cookie
            secure: process.env.NODE_ENV === "production",  // use secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',  //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// login function  API ENDPOINT = /api/user/login

export const login = async (req, res) => {
    try {
        //here we need email and password for login
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "Email and password are required" });
        // suppose u have email and password also then u find teh user drom db
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }
        // if we get the user from db then match the password
        //if it match it will give true else false
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.json({ success: false, message: "Invalid email or password" });

        // if password match then create the jwt token because whenever user login we need to create the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,  //prevent js to access the cookie
            secure: process.env.NODE_ENV === "production",  // use secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',  //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
        })
        return res.json({ success: true,user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Check Auth      API ENDPOINT = /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        // const { userId } = req.body;
        const { userId } = req;
        const user = await User.findById(userId).select('-password');
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// logout function   API ENDPOINT = /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//so we have created all the controller functions for user authentication like register , login , isAuth and logout