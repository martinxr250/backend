import express from 'express';
import { reservasService } from '../services/reservas.service.js';
import { tokenExtractorMiddleware } from '../middlewares/token-extractor-middleware.js';

const router = express.Router();

// Ruta para obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await reservasService.getAll();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener una reserva por ID
router.get('/:nroReserva', async (req, res) => {
    try {
        const reserva = await reservasService.getById(req.params.nroReserva);
        res.json(reserva);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para crear una nueva reserva
router.post('/', async (req, res) => {
    try {
        console.log("LLEGO AL ROUTER");
        console.log(req.body);
        const nuevaReserva = await reservasService.create(req.body /* req.decodedToken.id */);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar una reserva por ID
router.put('/:nroReserva', async (req, res) => {
    try {
        const reservaActualizada = await reservasService.update(req.params.nroReserva, req.body);
        res.json(reservaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar una reserva por ID
router.delete('/:nroReserva', async (req, res) => {
    try {
        console.log("LLEGO AL REMOVE");
        await reservasService.remove(req.params.nroReserva);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//ruta para obtener habitaciones disponibles por tipo y fechas
router.get('/disponible', async (req, res) => {
    const { tipo, fechaEntrada, fechaSalida } = req.query;

    try {
        const habitacionId = await reservasService.getHabitacionDisponiblePorFechas(tipo, fechaEntrada, fechaSalida);
        res.status(200).json({ message: `Habitación disponible encontrada con ID: ${habitacionId}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// obtener las reservas de un usuario determinado
router.get("/get/by/user", tokenExtractorMiddleware, async (req, res, next) => {
    try {
        const response = await reservasService.getReservasByUsuario(req.decodedToken.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

// Nueva ruta para crear una reserva simple
router.post('/actualizar', async (req, res) => {
    const reservaData = req.body;

    try {
        const nuevaReserva = await reservasService.createReservaSimple(reservaData);
        return res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error("Error en la ruta /reserva-simple: ", error.message);
        return res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
    }
});

const reservas_router = { router };
export { reservas_router };
