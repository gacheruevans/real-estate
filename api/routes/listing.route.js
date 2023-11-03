import express from "express";
import { createListing, listing, listings, updateListing, deleteListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create",createListing);
router.get("/listings", listings);
router.get("/listing/:id", listing);
router.post("/update/:id", updateListing);
router.delete("/delete/:id", deleteListing);

export default router;