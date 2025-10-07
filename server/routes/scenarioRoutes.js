import express from "express";
import {
  createScenario,
  getScenarios,
  getScenarioById,
  deleteScenario,
} from "../controllers/scenarioController.js";

const router = express.Router();

router.post("/", createScenario);
router.get("/", getScenarios);
router.get("/:id", getScenarioById);
router.delete("/:id", deleteScenario);

export default router;
