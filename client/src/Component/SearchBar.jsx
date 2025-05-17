import { useState } from "react";
import axios from "axios";

const SearchBar = ({ onResults }) => {
  const [user, setUser] = useState(null);
  const [term, setTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/search",
        { term },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onResults(res.data.results); // send results back to parent
    } catch (err) {
      console.error("Search failed:", err);
    }

    localStorage.getItem("authToke");
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 p-4">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search images..."
        className="border p-2 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
