import express from "express";
const router = express.Router();
// import { tokenExtractorMiddleware } from "../middlewares/token-extractor-middleware.js";
import {envioCorreo_services} from "../services/envioCorreo.service.js";

router.get('/', async (req, res) => {
    try {
        console.log("Estoy en la ruta de envio de correo");
        console.log(req.body);
        await envioCorreo_services.sendRecoveryEmail(req.body.email, req.body.recoveryLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const envioCorreo_router = {router};

export {envioCorreo_router};