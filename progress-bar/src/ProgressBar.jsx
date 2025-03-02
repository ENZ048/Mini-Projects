import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (percentage < 100) {
      const interval = setInterval(() => {
        setPercentage((prev) => (prev < 100 ? prev + 1 : 100));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [percentage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <h1 className="text-4xl font-bold text-white mb-8">Progress Tracker</h1>
      <div className="relative w-full max-w-xl h-10 bg-gray-300 rounded-full overflow-hidden shadow-lg">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
        <span
          className="absolute inset-0 flex items-center justify-center text-lg font-semibold"
          style={{ color: percentage > 40 ? "white" : "black" }}
        >
          {percentage < 100 ? "Loading..." : "Completed"} ({percentage}%)
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
