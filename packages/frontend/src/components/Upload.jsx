import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadRequest } from "../../api/upload";

const UPLOAD_STATUS = {
  IDLE: "idle", //al iniciar el componente
  READY: "ready", //cuando el archivo esta listo para ser subido
  PENDING: "pending", //cuando se esta subiendo el archivo
  SUCCESS: "success", //cuando el archivo se subio correctamente, y el servidor respondio con un 200
  ERROR: "error", //cuando el archivo no se subio correctamente o el servidor respondio con un 400
};

export function Upload({ visible }) {
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);

  console.log("uploadStatus:", uploadStatus);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length > 0 && acceptedFiles[0].type === "text/csv") {
      setUploadStatus(UPLOAD_STATUS.READY);
    } else {
      acceptedFiles = [];
      setUploadStatus(UPLOAD_STATUS.IDLE);
    }
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
      setUploadStatus(UPLOAD_STATUS.PENDING);
      const res = await uploadRequest(formData);
      formData.delete("file");
      if (res.status === 200) setUploadStatus(UPLOAD_STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setUploadStatus(UPLOAD_STATUS.ERROR);
    }
  };
  return (
    <div
      className={`dnd-container ${visible ? "slide-in-top " : "slide-out-top"}`}
    >
      <form action="" className="dnd-form" onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dnd">
          <input {...getInputProps()} />
          {uploadStatus === UPLOAD_STATUS.READY ? (
            <p> {acceptedFiles[0]?.name}</p>
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
        {uploadStatus === UPLOAD_STATUS.READY && (
          <div className="dnd-button">
            <button
              type="submit"
              disabled={uploadStatus === UPLOAD_STATUS.PENDING}
            >
              {uploadStatus === UPLOAD_STATUS.READY
                ? "Procesar"
                : "Procesando..."}
            </button>
          </div>
        )}
        {uploadStatus === UPLOAD_STATUS.PENDING && (
          <div className="dnd-button">
            <button
              type="submit"
              disabled={uploadStatus === UPLOAD_STATUS.PENDING}
            >
              {uploadStatus === UPLOAD_STATUS.READY
                ? "Procesar"
                : "Procesando..."}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
