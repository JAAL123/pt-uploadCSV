import "./App.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop, maxFiles: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
  };

  return (
    <>
      <div className="container">
        <div className="dnd-container">
          <form action="" className="dnd-form" onSubmit={handleSubmit}>
            <div {...getRootProps()} className="dnd">
              <input {...getInputProps()} />
              {acceptedFiles.length > 0 ? (
                <p> {acceptedFiles[0].name}</p>
              ) : (
                [
                  isDragActive ? (
                    <p key="1">Suelta el archivo</p>
                  ) : (
                    <p key="2">
                      Arrastra y suelta un archivo o da click para selecionar
                    </p>
                  ),
                ]
              )}
            </div>
            <div className="dnd-button">
              <button type="submit">Procesar</button>
            </div>
          </form>
        </div>
        <div className="search-container">
          <div className="sb-container">
            <input type="text" className="search-bar" placeholder="buscar..." />
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
