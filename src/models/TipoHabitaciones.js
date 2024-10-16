import { DataTypes } from 'sequelize';

const tipoHabitacionesAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT, // Agregar el atributo descripcion de tipo TEXT
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    esActivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

};

const tipoHabitacionesOptions = {
    timestamps: false, // Deshabilitar timestamps
    tableName: 'tipohabitaciones' // Nombre correcto de la tabla
};

const tipoHabitacionesModel = {
    attributes: tipoHabitacionesAttributes,
    Options: tipoHabitacionesOptions
};

export {tipoHabitacionesModel}