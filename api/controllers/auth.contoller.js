import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'; 

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
