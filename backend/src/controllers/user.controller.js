import { Employee } from "../models/user.model.js";
import csvToJson from "convert-csv-to-json";
import { Op } from "sequelize";
import { unlink } from "fs";

const removeFile = (path) => {
  unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

export const createUserFromCSV = async (req, res) => {
  //1. verificar que se cargue el archivo
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No se ha cargado el archivo" });
  }
  //2. leer el contenido del archivo que se ha cargado y copnvertirlo a array de objetos
  const data = csvToJson.fieldDelimiter(",").getJsonFromCsv(file.path);
  //mapear de forma correcta los datos
  const mappedData = data.map((item) => ({
    firstName: item.nombre,
    lastName: item.apellido,
    email: item.correo,
    age: item.edad,
    department: item.departamento,
  }));
  //3. guardar los datos en la base de datos
  try {
    const newEmlpoyees = await Employee.bulkCreate(mappedData);
    removeFile(file.path);
    return res.status(200).json(newEmlpoyees);
  } catch (error) {
    removeFile(file.path);
    return res.status(500).json({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  const name = req.query.q;
  if (!name) {
    return res
      .status(400)
      .json({ message: "No se ha proporcionado un criterio de búsqueda" });
  }
  try {
    const employeesFound = await Employee.findAll({
      where: {
        firstName: { [Op.iLike]: `%${name}%` },
      },
    });
    return res.status(200).json(employeesFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
