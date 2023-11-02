import express from "express";
import { signup, signin, google, signout } from "../controllers/auth.contoller.js";

const router = express();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;