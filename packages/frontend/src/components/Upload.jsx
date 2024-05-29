import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadRequest } from "../../api/upload";

export function Upload({ visible }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop, maxFiles: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (acceptedFiles.length === 0) {
      return;
    }
    if (acceptedFiles[0].type !== "text/csv") {
      return console.log("El archivo debe ser de tipo CSV");
    }
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    try {
      await uploadRequest(formData);
      formData.delete("file");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`dnd-container ${visible ? "slide-in-top " : "slide-out-top"}`}
    >
      <form action="" className="dnd-form" onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dnd">
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 && acceptedFiles.length === 0 ? (
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
  );
}
