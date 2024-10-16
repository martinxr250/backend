import { sequelize } from "../databases/databases.js";
import { ResourceNotFound } from "../errors/resource-not-found-error.js";

const getAll = async () => {
    const tipohabitaciones = await sequelize.models.tipohabitaciones.findAll();
    return tipohabitaciones.map(tipohabitacion => tipohabitacion.dataValues);
}

const getById = async (id) => {
    const tipohabitacion = await sequelize.models.tipohabitaciones.findOne({
        where: { id }
    });
    if (!tipohabitacion) {
        throw new ResourceNotFound("Tipo de habitación no encontrado");
    }
    return tipohabitacion.dataValues;
}

const create = async (data) => {
    const newTipohabitacion = await sequelize.models.tipohabitaciones.create(data);
    return newTipohabitacion.dataValues;
}

const update = async (id, data) => {
    const tipohabitacion = await sequelize.models.tipohabitaciones.findOne({
        where: { id }
    });
    if (!tipohabitacion) {
        throw new ResourceNotFound("Tipo de habitación no encontrado");
    }
    await tipohabitacion.update(data);
    return tipohabitacion.dataValues;
}

const remove = async (id) => {
    const tipohabitacion = await sequelize.models.tipohabitaciones.findOne({
        where: { id }
    });
    if (!tipohabitacion) {
        throw new ResourceNotFound("Tipo de habitación no encontrado");
    }
    await tipohabitacion.destroy();
    return { message: "Tipo de habitación eliminado exitosamente" };
}

const activas = async () => {
    const tipohabitaciones = await sequelize.models.tipohabitaciones.findAll({
        where: { esActivo: 1 }
    });
    return tipohabitaciones.map(tipohabitacion => tipohabitacion.dataValues);
}

const tipohabitaciones_services = {
    getAll,
    getById,
    create,
    update,
    remove,
    activas
}

export { tipohabitaciones_services };