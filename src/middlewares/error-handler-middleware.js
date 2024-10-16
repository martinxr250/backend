import { ResourceNotFound } from "../errors/resource-not-found-error.js";
import { ValidationError } from "sequelize";
import jwt from 'jsonwebtoken';

// middleware para manejo de errores basicos como un 500 si existe un error del lado del servidor o un error de restricciones en base de datos (400)
const errorHandler = (error, req, res, next) => {
    console.log("mensaje de error: ", error.message);
    
    if (error instanceof ResourceNotFound) {
        return res.status(error.status).json({ error: error.message });
    }

    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
    }

    if (error instanceof jwt.JsonWebTokenError) {
        // console.log("ENTRO AL ERROR DE FIRMA INVALIDA");
        return res.status(401).json({ error: "OOPS. Has tenido un error de sesión." });
    } 

    console.log("NO FUE NINGUNO DE LOS ANTERIORES: ", error);
    return res.status(500).json({ error: 'Error imprevisto.' });
};

export default errorHandler;