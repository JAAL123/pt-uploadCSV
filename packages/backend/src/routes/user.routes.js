import { Router} from "express";
import { createUserFromCSV,getUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/files", upload.single("file"), createUserFromCSV);
router.get("/users",getUsers)

export default router;