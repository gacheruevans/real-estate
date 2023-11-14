import express from "express";
import { 
    createListing, 
    listingDetails, 
    listings, 
    updateListing, 
    deleteListing, 
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create",createListing);
router.get("/listings", listings);
router.get("/listing/:id", listingDetails);
router.post("/update/:id", updateListing);
router.delete("/delete/:id", deleteListing);

export default router;