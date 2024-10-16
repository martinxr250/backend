import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/databases.js';

const reservasAttributes = {
    nroReserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dias: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaSalida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adultos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    niños: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioTotal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dniHuesped: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idHabitaciones: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipoHabitaciones: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
};

const reservasMethods = {
    timestamps: false,
    hooks: {
      beforeCreate: async (reserva, options) => {
          const ultimaReserva = await sequelize.models.reservas.findOne({
              order: [['nroReserva', 'DESC']] 
          });
          reserva.nroReserva = ultimaReserva ? ultimaReserva.nroReserva + 1 : 1;
      }
  },
    tableName: 'reservas' // Nombre de la tabla
};



const ReservasModel = {
    attributes: reservasAttributes,
    methods: reservasMethods,
};

export { ReservasModel };