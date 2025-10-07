function ReportGenerator({ email, setEmail, generateReport }) {
  return (
    <div className="mt-14 border-t border-gray-200 pt-10 text-center">
      <h2 className="text-2xl font-bold text-sky-700 mb-6">Generate Report</h2>
      <p className="text-gray-500 mb-4">
        Enter your email to download a PDF summary of your latest simulation.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:ring-2 focus:ring-sky-400 outline-none"
        />
        <button
          onClick={generateReport}
          className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default ReportGenerator;
