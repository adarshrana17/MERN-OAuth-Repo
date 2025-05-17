import { useEffect, useState } from "react";
import axios from "axios";

const TopSearches = ({ onSearch }) => {
  const [topTerms, setTopTerms] = useState([]);
  const backendURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${backendURL}/api/top-searches`)
      .then((res) => setTopTerms(res.data))
      .catch(() => setTopTerms([]));
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold text-gray-700 mb-2">
        🔝 Top Searches
      </h2>
      {topTerms.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {topTerms.map((item) => (
            <button
              key={item.term}
              onClick={() => onSearch(item.term)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
            >
              {item.term}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No popular searches yet.</p>
      )}
    </div>
  );
};

export default TopSearches;
