import express from "express";
import { simulateROI } from "../controllers/simulateController.js";

const router = express.Router();
router.post("/", simulateROI);

export default router;
