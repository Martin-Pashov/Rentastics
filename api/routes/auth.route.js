import express from "express";
import { google, signin, signup, signOut, /*forgotPassword*/ } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get('/signout', signOut);
//router.post("/forgotpassword", forgotPassword);

export default router;