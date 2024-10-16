import { sequelize } from "../databases/databases.js";
import { ResourceNotFound } from "../errors/resource-not-found-error.js";
import { habitacionesService } from "./habitaciones.service.js";
import { Op } from "sequelize";

// Obtener todas las reservas, incluyendo la habitacion y el usuario
const getAll = async () => {
    const reservas = await sequelize.models.reservas.findAll({
        include: [
            { model: sequelize.models.habitaciones,},
            { model: sequelize.models.usuarios}
        ]
    });
    return reservas.map(reserva => reserva.dataValues);
};



// Obtener reserva por ID
const getById = async (nroReserva) => {
    const reserva = await sequelize.models.reservas.findOne({
        where: { nroReserva },
        include: [
            { model: sequelize.models.usuarios, as: 'usuario' },
            { model: sequelize.models.habitaciones, as: 'habitacion' }
        ]
    });
    if (!reserva) {
        throw new ResourceNotFound("Reserva no encontrada");
    }
    return reserva.dataValues;
};

// obtener reservas por usuario
const getReservasByUsuario = async (idUsuario) => {
    const reservas = await sequelize.models.reservas.findAll({
        where: { idUsuario: idUsuario },
    });
    return reservas.map(reserva => reserva.dataValues);
}

const create = async (reservaData) => {
    const { tipoHabitacion, fechaIngreso, fechaSalida } = reservaData;

    // Obtener todas las habitaciones disponibles del tipo especificado
    const habitacionesDisponibles = await habitacionesService.getHabitacionDisponible(tipoHabitacion);

    // Intentar realizar la reserva con la primera habitación disponible sin fechas superpuestas
    for (const habitacionId of habitacionesDisponibles) {
        const disponible = await isHabitacionDisponible(habitacionId, fechaIngreso, fechaSalida);

        if (disponible) {
            // Crear la reserva con la habitación asignada
            const nuevaReserva = await sequelize.models.reservas.create({
                ...reservaData,
                idHabitaciones: habitacionId, // Asegúrate de usar el nombre correcto de la columna
                idUsuario: reservaData.idUsuario
            });

            return nuevaReserva.dataValues;
        }
    }

    // Si ninguna habitación está disponible para las fechas especificadas
    throw new Error(`No hay habitaciones disponibles del tipo Seleccionado para las fechas ingresadas.`);
};

// Actualizar una reserva existente
const update = async (nroReserva, data) => {
    const reserva = await sequelize.models.reservas.findOne({
        where: { nroReserva }
    });
    if (!reserva) {
        throw new ResourceNotFound("Reserva no encontrada");
    }
    await reserva.update(data);
    return reserva.dataValues;
};

// Eliminar una reserva
const remove = async (nroReserva) => {
    const reserva = await sequelize.models.reservas.findOne({
        where: { nroReserva }
    });
    if (!reserva) {
        throw new ResourceNotFound("Reserva no encontrada");
    }
    await reserva.destroy();
    return { message: "Reserva eliminada exitosamente" };
};

// Verificar disponibilidad de una habitación para fechas específicas
const isHabitacionDisponible = async (idHabitaciones, fechaIngreso, fechaSalida) => {
    const reservas = await sequelize.models.reservas.findAll({
        where: {
            idHabitaciones,
            [Op.or]: [
                {
                    fechaIngreso: {
                        [Op.between]: [fechaIngreso, fechaSalida]
                    }
                },
                {
                    fechaSalida: {
                        [Op.between]: [fechaIngreso, fechaSalida]
                    }
                },
                {
                    [Op.and]: [
                        {
                            fechaIngreso: {
                                [Op.lte]: fechaIngreso
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

const createReservaSimple = async (reservaData) => {
    try {
        console.log("Creando reserva simple: ", reservaData);
        const nuevaReserva = await sequelize.models.reservas.create(reservaData);
        return nuevaReserva.dataValues;
    } catch (error) {
        console.error("Error al crear la reserva: ", error);
        throw new Error('Error al crear la reserva.');
    }
};

// Exportar el servicio de reservas
const reservasService = {
    getAll,
    getById,
    create,
    createReservaSimple,
    update,
    remove,
    isHabitacionDisponible,
    getReservasByUsuario
};

export { reservasService };
