import express from "express";
import { 
    createListing, 
    getlisting, 
    listings, 
    updateListing, 
    deleteListing, 
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/listings", listings);
router.get("/getListing/:id", getlisting);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;