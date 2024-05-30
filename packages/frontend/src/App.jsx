import "./App.css";
import { Upload } from "./components/Upload";
import { useState, useEffect } from "react";
import { searchRequest } from "../api/search";
import { useDebounce } from "@uidotdev/usehooks";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  const onChange = async (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery === "") return setSearchResults([]);
    const fetchData = async () => {
      const res = await searchRequest(debouncedQuery);
      setSearchResults(res.data);
    };
    fetchData();
  }, [debouncedQuery]);

  return (
    <>
      <div className="container">
        <Upload visible={isVisible} />
        <div className="search-container">
          <div className="sb-container">
            {!isVisible && (
              <button
                className="upload-button"
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                Cargar Archivo
              </button>
            )}
            <form action="" className="search-bar">
              <input
                type="text"
                className="search-bar-input"
                placeholder="buscar..."
                onFocus={() => {
                  setIsVisible(false);
                }}
                onChange={onChange}
              />
            </form>
          </div>
          <div className="search-results-container">
            {searchResults.map((user) => (
              <div key={user.id} className="search-card">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </div>
            ))}
            {searchResults.length === 0 && (
              <p>No hay resultados que mostrar...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
