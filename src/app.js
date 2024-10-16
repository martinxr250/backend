import express from "express"
import cors from "cors"
import errorHandler from "./middlewares/error-handler-middleware.js";
import { usuarios_router } from "./routes/usuarios.routes.js";
import { tipoHabitaciones_router } from "./routes/tipoHabitaciones.routes.js";
import { habitaciones_router } from "./routes/habitaciones.routes.js";
import { reservas_router } from "./routes/reservas.routes.js";
import { envioCorreo_router } from "./routes/envioCorreo.routes.js";

const app = express(); // incializo una app express
app.use(express.json());
app.use(cors()); // declaro politicas de cors

app.use("/api/medres/usuarios", usuarios_router.router)
app.use("/api/medres/tipoHabitaciones", tipoHabitaciones_router.router); // Usar el router correcto
app.use("/api/medres/habitaciones", habitaciones_router.router); // Usar el router correcto
app.use("/api/medres/reservas", reservas_router.router); // Usar el router correcto
app.use("/api/medres/recupero-contrasena", envioCorreo_router.router); // Usar el router correcto

app.use(errorHandler)


export default app