import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import simulateRoutes from "./routes/simulateRoutes.js";
import scenarioRoutes from "./routes/scenarioRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());

// This line ensures Express can read JSON POST bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/simulate", simulateRoutes);
app.use("/scenarios", scenarioRoutes);
app.use("/report", reportRoutes);
app.get("/", (req, res) => {
  res.send("Invoicing ROI Simulator Backend ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
