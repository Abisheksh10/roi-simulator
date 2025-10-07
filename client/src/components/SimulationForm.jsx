function SimulationForm({ form, setForm, handleSubmit, loading }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block text-sm font-semibold text-gray-600 mb-1 capitalize">
            {key.replaceAll("_", " ")}
          </label>
          <input
            type="number"
            step="any"
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder="Enter value"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
            required
          />
        </div>
      ))}

      <div className="md:col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Simulating..." : "Run Simulation"}
        </button>
      </div>
    </form>
  );
}

export default SimulationForm;
