import { sequelize } from "../databases/databases.js";
import { ResourceNotFound } from "../errors/resource-not-found-error.js";
import { HabitacionesModel } from '../models/habitaciones.js';
import { tipoHabitacionesModel } from '../models/TipoHabitaciones.js';

// Obtener todas las habitaciones, incluyendo el tipo de habitación
const getAll = async () => {
    const habitaciones = await sequelize.models.habitaciones.findAll({
        include: {
            model: sequelize.models.tipohabitaciones
        }
    });
    return habitaciones.map(habitacion => habitacion.dataValues);
};

// Obtener una habitación por ID
const getById = async (id) => {
    const habitacion = await sequelize.models.habitaciones.findOne({
        where: { id }
    });
    if (!habitacion) {
        throw new ResourceNotFound("Habitación no encontrada");
    }
    return habitacion.dataValues;
};

// Crear una nueva habitación
const create = async (data) => {
    const newHabitacion = await sequelize.models.habitaciones.create(data);
    return newHabitacion.dataValues;
};

// Actualizar una habitación existente
const update = async (id, data) => {
    const habitacion = await sequelize.models.habitaciones.findOne({
        where: { id }
    });
    if (!habitacion) {
        throw new ResourceNotFound("Habitación no encontrada");
    }
    await habitacion.update(data);
    return habitacion.dataValues;
};

// Eliminar una habitación
const remove = async (id) => {
    const habitacion = await sequelize.models.habitaciones.findOne({
        where: { id }
    });
    if (!habitacion) {
        throw new ResourceNotFound("Habitación no encontrada");
    }
    await habitacion.destroy();
    return { message: "Habitación eliminada exitosamente" };
};

// Obtener todas las habitaciones disponibles por tipo
const getHabitacionDisponible = async (tipo) => {
    try {
        const habitaciones = await sequelize.models.habitaciones.findAll({
            where: {
                estado: 'Disponible', // Asegúrate de que el estado coincida con el valor correcto
                tipoHabitacion: tipo
            }
        });

        if (habitaciones.length === 0) {
            throw new Error(`No hay habitaciones disponibles del tipo ${tipo}`);
        }

        return habitaciones.map(habitacion => habitacion.id);
    } catch (error) {
        throw new Error(`Error al buscar habitaciones disponibles: ${error.message}`);
    }
};

// Verificar disponibilidad de una habitación para fechas específicas
const isHabitacionDisponible = async (idHabitacion, fechaEntrada, fechaSalida) => {
    const reservas = await sequelize.models.reservas.findAll({
        where: {
            idHabitacion,
            [Op.or]: [
                {
                    fechaEntrada: {
                        [Op.between]: [fechaEntrada, fechaSalida]
                    }
                },
                {
                    fechaSalida: {
                        [Op.between]: [fechaEntrada, fechaSalida]
                    }
                },
                {
                    [Op.and]: [
                        {
                            fechaEntrada: {
                                [Op.lte]: fechaEntrada
                            }
                        },
                        {
                            fechaSalida: {
                                [Op.gte]: fechaSalida
                            }
                        }
                    ]
                }
            ]
        }
    });

    return reservas.length === 0;
};

// Exportar el servicio de habitaciones
const habitacionesService = {
    getAll,
    getById,
    create,
    update,
    remove,
    getHabitacionDisponible,
    isHabitacionDisponible
};

export { habitacionesService };
