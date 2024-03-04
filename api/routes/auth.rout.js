import express from "express";
import { signup } from "../controllers/auth.conroller.js";

const router = express.Router();
router.post("/signup", signup);