import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type:String,
        default: "https://pixabay.com/get/g62368fcafe7f2b4e6bc42880e16215c6b5c338d67e9605303735ab9c4391d72ff8b3d300dc461e103da3edf00c0ff461d0733ab7dce911e47439841d8dcd1998b932d7c7fa6f86d20463303cfe97ae93_640.png"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;