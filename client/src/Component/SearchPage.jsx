import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import ImageGrid from "./ImageGrid.jsx";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  setUser(localStorage.getItem("user"));

  return (
    <div>
      <SearchBar onResults={setResults} />
      <ImageGrid images={results} />
    </div>
  );
};

export default SearchPage;
