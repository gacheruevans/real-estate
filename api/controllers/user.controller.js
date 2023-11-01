import bycryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req,res) => {
    res.json({
        message: 'API Route is working!',
    })
};

export const updateUser = async (req,res, next) => {
    if(req.user.id !== req.params.id ) return next(errorHandler(403, 'You can only update your own accoount'));

    try {
        if(req.body.password) {
            req.body.password = bycryptjs.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                avatar: req.body.avatar,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname:   req.body.lastname,
                password: req.body.password,
            }
        }, {new: true});
        const {password, ...updatedInfo} = updateUser._doc;
        res.status(200).json(updatedInfo);
    } catch (error) {
        next(error)
    }
};