import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";

const app = express();

//middlewares
app.use(cors({ origin: true }));
app.use(morgan("dev"));

//rutas
app.use("/api", userRoutes);

export default app;
