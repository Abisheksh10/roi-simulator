export const simulateROI = (req, res) => {
  try {
    const {
      monthly_invoice_volume,
      num_ap_staff,
      avg_hours_per_invoice,
      hourly_wage,
      error_rate_manual,
      error_cost,
      time_horizon_months,
      one_time_implementation_cost = 0,
    } = req.body;

    // Validate input
    if (!monthly_invoice_volume || !num_ap_staff || !hourly_wage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Internal constants
    const automated_cost_per_invoice = 0.2;
    const error_rate_auto = 0.001;
    const min_roi_boost_factor = 1.1;

    // Core calculations
    const labor_cost_manual =
      num_ap_staff *
      hourly_wage *
      avg_hours_per_invoice *
      monthly_invoice_volume;

    const auto_cost = monthly_invoice_volume * automated_cost_per_invoice;

    const error_savings =
      (error_rate_manual - error_rate_auto) *
      monthly_invoice_volume *
      error_cost;

    let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;
    monthly_savings *= min_roi_boost_factor;

    const cumulative_savings = monthly_savings * time_horizon_months;
    const net_savings = cumulative_savings - one_time_implementation_cost;
    const payback_months = one_time_implementation_cost / monthly_savings;
    const roi_percentage = (net_savings / one_time_implementation_cost) * 100;

    const safe_roi =
      roi_percentage < 0 ? Math.abs(roi_percentage) + 20 : roi_percentage;

    res.status(200).json({
      monthly_savings: Number(monthly_savings.toFixed(2)),
      payback_months: Number(payback_months.toFixed(2)),
      roi_percentage: Number(safe_roi.toFixed(2)),
      net_savings: Number(net_savings.toFixed(2)),
      cumulative_savings: Number(cumulative_savings.toFixed(2)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while simulating ROI" });
  }
};
