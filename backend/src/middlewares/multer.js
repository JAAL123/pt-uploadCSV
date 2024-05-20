// const multer = require('multer');
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

// Configura el almacenamiento temporal
export const storage = multer.diskStorage({
  destination: join(currentDir, "../../tmp/uploads"),
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    const name = file.originalname.trim().replace(extension, "");
    cb(null, `${name}-${Date.now()}${extension}`);
  },
});

// Crea el middleware de Multer
export const upload = multer({ storage, limits: { fileSize: 1000000 } });
