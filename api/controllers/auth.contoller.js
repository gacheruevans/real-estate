import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'; 

export const signup = async (req, res, next) => {
    const { username, firstname, lastname, email, password, confirm_password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    if (confirm_password != password) {
        res.status(401).json({
            message: 'Password and Confirm Password Do Not Match!',
        });
    } else {
        try {
            const newUser = new User({ username, firstname, lastname, email, password: hashPassword });
            await newUser.save();
            res.status(201).json({
                message: 'User Created Successfully',
            });
        } catch (error) {
            next(error);
        }
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
   
    try {
        const findUser = await User.findOne({ email });
        if (!findUser) throw next(errorHandler(404,'User does not Exist!'));
        const validPassword = bcryptjs.compareSync(password, findUser.password);
        if(!validPassword) throw next(errorHandler(401, 'Invalid credentials!'));

        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
        const {password: pass, ...userInfo} = findUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() +  24 * 60 * 60 * 1000)})
            .status(200)
            .json(userInfo);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const {password: pass, ...userInfo} = user._doc;
            res
                .cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() +  24 * 60 * 60 * 1000) })
                .status(200)
                .json(userInfo);
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ 
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email, 
                password: hashedPassword, 
                avatar: req.body.photo, 
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...userInfo } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true ,expires: new Date(Date.now() +  24 * 60 * 60 * 1000) })
                .status(200)
                .json(userInfo);
        }
    } catch (error) {
        next(error)
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!')
    } catch (error) {
        next(error);
    }
};