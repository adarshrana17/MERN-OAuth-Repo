import { useEffect, useState } from "react";
import axios from "axios";

const SearchHistory = ({ onSearch }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get("http://localhost:5000/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setHistory(res.data))
        .catch((err) => console.error("History fetch failed:", err));
    }
  }, []);

  if (history.length === 0) return null;

  function handleClearHistory() {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    axios
      .delete("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setHistory([]);
      })
      .catch((err) => console.error("Failed to clear history:", err));
  }

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2 text-gray-700">Your Recent Searches</h2>
      <div className="flex flex-wrap gap-3">
        {history.map((item, index) => (
          <div key={index} className="">
            <button
              onClick={() => onSearch(item.term)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {item.term}
            </button>
            <span className="text-gray-500 text-xs">
              ({new Date(item.createdAt).toLocaleString()})
            </span>{" "}
          </div>
        ))}
        <button
          onClick={handleClearHistory}
          className="absolute right-10 top-45 px-2.5 py-1.5 bg-red-600 text-white rounded-lg"
        >
          Clear History
        </button>
      </div>
    </div>
  );
};

export default SearchHistory;
