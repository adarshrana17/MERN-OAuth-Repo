import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import TopSearches from "./TopSearches.jsx";
import SearchHistory from "./SearchHistory.jsx";
import ImageGrid from "./ImageGrid.jsx"; // ✅ Imported ImageGrid

const Home = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const modalRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Load logged-in user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // ✅ Search handler
  const searchImages = async (termToSearch) => {
    setTerm(termToSearch);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setShowPopup(true);
      return;
    }

    if (!termToSearch.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.post(
        `${backendURL}/api/search`,
        { term: termToSearch },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(res.data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  // ✅ Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Search App</h1>
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          <div
            className="modal absolute right-5 top-5 flex w-[40px] h-[40px] items-center justify-center bg-blue-600 text-white rounded-4xl"
            onClick={() => setShowModal(true)}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>

      {/* Top Searches and Search History */}
      {user && <TopSearches onSearch={searchImages} />}
      <SearchHistory onSearch={searchImages} />

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for images..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => searchImages(term)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Alert for login */}
      {showPopup && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          ⚠️ Please login to perform search.
        </div>
      )}

      {/* ✅ Use ImageGrid here */}
      {results.length > 0 && <ImageGrid images={results} />}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-end top-5">
          <div
            ref={modalRef}
            className="bg-gray-100 shadow-md w-84 p-4 rounded-lg mt-14 mr-4"
          >
            <div className="flex flex-col gap-3 p-3 border-b">
              <h1 className="text-2xl font-bold">
                Welcome, {user.name || "User"}!
              </h1>
              <p>Email: {user.email || "Not provided"}</p>
              <p className="text-green-600">
                Hello {user.name || "User"} you're authenticated
              </p>
              <button
                className="px-2.5 py-1.5 bg-red-500 text-white rounded-xl"
                onClick={handleLogout}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
