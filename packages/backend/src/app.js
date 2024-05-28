import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

// configuracion de multer

// endpoint para manejar el archivo que se va a subir
app.use("/api", userRoutes);

// endpoint para manejar la consulta de los datos, segun parametro =?q
app.get("api/data", (req,res) =>{
    //1. verificar que se reciba el parametro q
    //2. buscar en la base de datos los datos que coincidan con el parametro q
    //3. enviar la respuesta al cliente
})


export default app;
