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
    const hashPassword = bcryptjs.hashSync(password, 10);
   
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