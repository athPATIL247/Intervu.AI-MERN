import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Interview } from "../models/interview.model.js";

const ONEDAY = 1*24*60*60*1000;

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All the input fields are reqd"
            })
        }
        const user = await User.findOne({email});
        if(user) return res.status(401).json({
            success: false,
            message: "Email already exists"
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Signing Up The User"
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All the input fields are reqd"
            })
        }
        let user = await User.findOne({email});
        if(!user) return res.status(401).json({
            success: false,
            message: "Email not registered with Intervu.AI"
        })
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({
            message: "Incorrect Password",
            success: false
        });

        if (!process.env.SECRET_KEY) throw new Error("Missing SECRET_KEY in .env");

        const interviews = await Interview.find({createdBy: user._id})

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            interviews
        }

        return res.status(201).cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: ONEDAY }).json({
            success: true,
            message: "Login Successfull",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Signing In The User"
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.cookie('token', '', { maxAge: 0, sameSite: 'none', secure: true }).json({
            message: "Logged Out Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const verifyToken = async (req, res) => {
    try {
        if (req.id) return res.status(200).json({ success: true, message: "Token verified" });
        return res.status(400).json({ success: false, message: "Token not verified" })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Token not verified" })
    }
}