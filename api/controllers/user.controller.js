import bycryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req,res) => {
    res.json({
        message: 'API Route is working!',
    })
};

export const updateUser = async (req, res, next) => {
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
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id ) return next(errorHandler(401, 'You can only delete your own accoount!'));

    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message: `Deleted user with id ${deleteUser}`});
    } catch (error) {
        next(error);
    }
};

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id ) {
       try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
       } catch (error) {
            next(error);
       }
    }else {
        return next(errorHandler(401, 'You can only view your own listings!'))
    }
};