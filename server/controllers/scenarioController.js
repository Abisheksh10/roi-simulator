import Scenario from "../models/Scenario.js";

// Create new scenario
export const createScenario = async (req, res) => {
  try {
    const scenario = new Scenario(req.body);
    const saved = await scenario.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving scenario" });
  }
};

// Get all scenarios
export const getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ createdAt: -1 });
    res.json(scenarios);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scenarios" });
  }
};

// Get one scenario by ID
export const getScenarioById = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (!scenario) return res.status(404).json({ message: "Not found" });
    res.json(scenario);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scenario" });
  }
};

// Delete scenario
export const deleteScenario = async (req, res) => {
  try {
    await Scenario.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting scenario" });
  }
};
