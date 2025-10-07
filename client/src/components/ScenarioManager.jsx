function ScenarioManager({
  scenarioName,
  setScenarioName,
  scenarios,
  saveScenario,
  loadScenario,
  deleteScenario,
}) {
  return (
    <div className="mt-14 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-sky-700 text-center mb-6">
        Scenario Management
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter scenario name"
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:ring-2 focus:ring-sky-400 outline-none"
        />
        <button
          onClick={saveScenario}
          className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Save Scenario
        </button>
      </div>

      <div className="max-h-72 overflow-y-auto px-2">
        {scenarios.length === 0 ? (
          <p className="text-center text-gray-500">No saved scenarios yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {scenarios.map((s) => (
              <li
                key={s._id}
                className="flex items-center justify-between py-3 px-3 hover:bg-sky-50 rounded-lg transition"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {s.scenario_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ROI: {s.results?.roi_percentage}% |{" "}
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadScenario(s._id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteScenario(s._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ScenarioManager;
