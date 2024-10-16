import {DataTypes} from 'sequelize';

const usuariosAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    es_activo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const usuariosMethods = {
    timestamps: false
};

const UsuariosModel = {
    attributes: usuariosAttributes,
    methods: usuariosMethods
};

export {UsuariosModel}