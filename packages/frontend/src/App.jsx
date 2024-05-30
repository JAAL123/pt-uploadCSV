import "./App.css";
import { Upload } from "./components/Upload";
import { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <div className="container">
        <Upload visible={isVisible} />
        <div className="search-container">
          <div className="sb-container">
            <input
              type="text"
              className="search-bar"
              placeholder="buscar..."
              onFocus={() => {
                setIsVisible(false);
              }}
            />
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
          </div>
          <div className="search-results-container">
            aca van las cards con los resultados de la busqueda de los archivos
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
