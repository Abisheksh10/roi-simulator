import { useState, useEffect } from "react";
import axios from "axios";
import SimulationForm from "./SimulationForm";
import ResultsCard from "./ResultsCard";
import ScenarioManager from "./ScenarioManager";
import ReportGenerator from "./ReportGenerator";

function ROIForm() {
  const [form, setForm] = useState({
    monthly_invoice_volume: "",
    num_ap_staff: "",
    avg_hours_per_invoice: "",
    hourly_wage: "",
    error_rate_manual: "",
    error_cost: "",
    time_horizon_months: "",
    one_time_implementation_cost: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState("");
  const [email, setEmail] = useState("");

  // === Simulation ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/simulate`, form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error running simulation");
    }
    setLoading(false);
  };

  // === Scenario CRUD ===
  const fetchScenarios = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/scenarios`);
      setScenarios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveScenario = async () => {
    if (!scenarioName.trim() || !result) {
      alert("Please run a simulation and enter a scenario name.");
      return;
    }
    const payload = { scenario_name: scenarioName, ...form, results: result };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/scenarios`, payload);
      setScenarioName("");
      fetchScenarios();
      alert("Scenario saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving scenario");
    }
  };

  const loadScenario = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/scenarios/${id}`);
      const data = res.data;
      setForm({
        monthly_invoice_volume: data.monthly_invoice_volume,
        num_ap_staff: data.num_ap_staff,
        avg_hours_per_invoice: data.avg_hours_per_invoice,
        hourly_wage: data.hourly_wage,
        error_rate_manual: data.error_rate_manual,
        error_cost: data.error_cost,
        time_horizon_months: data.time_horizon_months,
        one_time_implementation_cost: data.one_time_implementation_cost,
      });
      setResult(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteScenario = async (id) => {
    if (!confirm("Are you sure you want to delete this scenario?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/scenarios/${id}`);
      fetchScenarios();
    } catch (err) {
      console.error(err);
    }
  };

  // === Report Download ===
  const generateReport = async () => {
    if (!result) {
      alert("Please run a simulation first.");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email to download the report.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/report/generate`,
        {
          email,
          scenario: {
            scenario_name: scenarioName || "Quick Simulation",
            results: result,
          },
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ROI_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Error generating report");
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 px-4 py-10 text-gray-800">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-sky-700 mb-2">
            Invoicing ROI Simulator
          </h1>
          <p className="text-gray-500 text-lg">
            Estimate your savings, payback, and ROI when switching from manual to automated invoicing.
          </p>
        </header>

        <SimulationForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {result && <ResultsCard result={result} />}

        <ScenarioManager
          scenarioName={scenarioName}
          setScenarioName={setScenarioName}
          scenarios={scenarios}
          saveScenario={saveScenario}
          loadScenario={loadScenario}
          deleteScenario={deleteScenario}
        />

        <ReportGenerator
          email={email}
          setEmail={setEmail}
          generateReport={generateReport}
        />
      </div>
    </div>
  );
}

export default ROIForm;
