import { Router} from "express";
import { createUserFromCSV } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/files", upload.single("file"), createUserFromCSV);

export default router;