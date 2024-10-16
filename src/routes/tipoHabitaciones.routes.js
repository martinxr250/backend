import express from 'express';
import { tipohabitaciones_services } from '../services/tipoHabitaciones.service.js';

const router = express.Router();

// Ruta para obtener todos los tipos de habitaciones
router.get('/', async (req, res) => {
    try {
        const tiposHabitaciones = await tipohabitaciones_services.getAll();
        res.json(tiposHabitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un tipo de habitación por ID
router.get('/:id', async (req, res) => {
    try {
        const tipoHabitacion = await tipohabitaciones_services.getById(req.params.id);
        res.json(tipoHabitacion);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para insertar un nuevo tipo de habitación
router.post('/', async (req, res) => {
    try {
        const nuevoTipoHabitacion = await tipohabitaciones_services.create(req.body);
        res.status(201).json(nuevoTipoHabitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar un tipo de habitación por ID
router.put('/:id', async (req, res) => {
    try {
        const tipoHabitacionActualizado = await tipohabitaciones_services.update(req.params.id, req.body);
        res.json(tipoHabitacionActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar un tipo de habitación por ID
router.delete('/:id', async (req, res) => {
    try {
        const mensaje = await tipohabitaciones_services.remove(req.params.id);
        res.json(mensaje);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para obtener todos los tipos de habitaciones activos
router.get('/estado/activas', async (req, res) => {
    try {
        const tipohabitacionesActivas = await tipohabitaciones_services.activas();
        res.json(tipohabitacionesActivas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



const tipoHabitaciones_router = { router}
export { tipoHabitaciones_router }