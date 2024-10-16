import { usuarios_services } from "../services/usuarios.service.js";
import express from "express";
const router = express.Router();
import { tokenExtractorMiddleware } from "../middlewares/token-extractor-middleware.js";
//Implementar -> Error Handler Middleware.
router.get("/" ,async (req, res, next) => {
    try {
        const response = await usuarios_services.getAll();
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

router.post("/" ,async (req, res, next) => {
    try {
        const response = await usuarios_services.createUsuario(req.body);
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

router.put("/" ,async (req, res, next) => {
    try {
        console.log(req.body)
        const response = await usuarios_services.updateUsuario(req.body);
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const response = await usuarios_services.login(req.body);
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

router.get("/protected", tokenExtractorMiddleware, async (req, res, next) => {

    console.log("id token procesado: ", req.decodedToken.id);

    if (!req.decodedToken || !req.decodedToken.id || !req.token) {
        return res.status(401).json({ error: "Token no ha sido provisto" });
    }

    // para permisos
    if (req.decodedToken.idRol !== 1) {
        return res.status(403).json({ error: "No tiene permisos para acceder a este recurso" });
    }

    try {
        const response = await usuarios_services.getAll();
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

router.get("/:correo", async (req, res, next) => {
    try {
        const response = await usuarios_services.getUsuarioByCorreo(req.params.correo);
        if (response) {
            return res.json(response);
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        next(error);
    }
});


const usuarios_router = { router}
export { usuarios_router }