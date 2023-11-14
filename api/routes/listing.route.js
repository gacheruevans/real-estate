import express from "express";
import { 
    createListing, 
    getlisting, 
    listings, 
    updateListing, 
    deleteListing, 
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create",createListing);
router.get("/listings", listings);
router.get("/getListing/:id", getlisting);
router.post("/update/:id", updateListing);
router.delete("/delete/:id", deleteListing);

export default router;