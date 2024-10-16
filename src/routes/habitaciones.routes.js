import express from 'express';
import { habitacionesService } from '../services/habitaciones.service.js';

const router = express.Router();

// Ruta para obtener todas las habitaciones
router.get('/', async (req, res) => {
    try {
        const habitaciones = await habitacionesService.getAll();
        res.json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener una habitación por ID
router.get('/:id', async (req, res) => {
    try {
        const habitacion = await habitacionesService.getById(req.params.id);
        res.json(habitacion);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para crear una nueva habitación
router.post('/', async (req, res) => {
    try {
        const nuevaHabitacion = await habitacionesService.create(req.body);
        res.status(201).json(nuevaHabitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar una habitación por ID
router.put('/:id', async (req, res) => {
    try {
        const habitacionActualizada = await habitacionesService.update(req.params.id, req.body);
        res.json(habitacionActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar una habitación por ID
router.delete('/:id', async (req, res) => {
    try {
        const mensaje = await habitacionesService.remove(req.params.id);
        res.json(mensaje);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para obtener una habitación disponible según el tipo
router.get('/disponible/:tipo', async (req, res) => {
    try {
        const { tipo } = req.params;
        const habitacion = await habitacionesService.getHabitacionDisponible(tipo);
        res.status(200).json(habitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const habitaciones_router = { router };
export { habitaciones_router };
