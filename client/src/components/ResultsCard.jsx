function ResultsCard({ result }) {
  return (
    <div className="mt-12 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100 p-8 text-center shadow-inner">
      <h2 className="text-2xl font-bold text-sky-700 mb-8">
        Simulation Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Monthly Savings</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${result.monthly_savings.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Payback Period</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {result.payback_months} months
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm font-medium uppercase">ROI (Projection)</h3>
          <p className="text-3xl font-bold text-sky-700 mt-2">
            {result.roi_percentage}%
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Net Savings</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            ${result.net_savings.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Cumulative Savings</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            ${result.cumulative_savings.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
