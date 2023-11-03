import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    pets: {
        type: Boolean,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        default: "https://pixabay.com/get/g62368fcafe7f2b4e6bc42880e16215c6b5c338d67e9605303735ab9c4391d72ff8b3d300dc461e103da3edf00c0ff461d0733ab7dce911e47439841d8dcd1998b932d7c7fa6f86d20463303cfe97ae93_640.png",
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;