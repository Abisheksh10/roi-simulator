import mongoose from "mongoose";

const ScenarioSchema = new mongoose.Schema(
  {
    scenario_name: { type: String, required: true },
    monthly_invoice_volume: Number,
    num_ap_staff: Number,
    avg_hours_per_invoice: Number,
    hourly_wage: Number,
    error_rate_manual: Number,
    error_cost: Number,
    time_horizon_months: Number,
    one_time_implementation_cost: Number,
    results: {
      monthly_savings: Number,
      payback_months: Number,
      roi_percentage: Number,
      net_savings: Number,
      cumulative_savings: Number,
    },
  },
  { timestamps: true }
);

const Scenario = mongoose.model("Scenario", ScenarioSchema);
export default Scenario;
