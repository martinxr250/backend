import { DataTypes } from 'sequelize';

const habitacionesAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoHabitacion: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
            model: 'tipohabitaciones', // Nombre de la tabla referenciada
            key: 'id'
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidadPersonas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
};

const habitacionesOptions = {
    timestamps: false,
    tableName: 'habitaciones' // Nombre de la tabla
};

const HabitacionesModel = {
    attributes: habitacionesAttributes,
    options: habitacionesOptions
};

export { HabitacionesModel };