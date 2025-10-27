import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Importa el dialecto mysql, necesario para producción
import { UsuariosModel } from "../models/Usuarios.js";
import { tipoHabitacionesModel } from '../models/TipoHabitaciones.js';
import { HabitacionesModel } from '../models/habitaciones.js';
import { ReservasModel } from '../models/Reservas.js';

// Creando la cadena de conexión a la base de datos
const sequelize = new Sequelize({
    dialect: "mysql",
    dialectModule: mysql2, // necesario para producción
    host: "bmai2yel1ulkml9tw3ns-mysql.services.clever-cloud.com",
    username: "ucj0z6x5yz7vanvh",
    password: "SoV9x5rkSFcf2d2eGE7H",
    database: "bmai2yel1ulkml9tw3ns"
});

sequelize.define("usuarios", UsuariosModel.attributes, UsuariosModel.methods);
sequelize.define("tipohabitaciones", tipoHabitacionesModel.attributes, tipoHabitacionesModel.Options);
sequelize.define("habitaciones", HabitacionesModel.attributes, HabitacionesModel.options); // Registrar el modelo Habitaciones
sequelize.define("reservas", ReservasModel.attributes, ReservasModel.methods); // Registrar el modelo Reservas



sequelize.models.tipohabitaciones.hasMany(sequelize.models.habitaciones, {
    foreignKey: 'tipoHabitacion',
});
sequelize.models.habitaciones.belongsTo(sequelize.models.tipohabitaciones, {
    foreignKey: 'tipoHabitacion',
});

// Relación entre reservas y tipohabitaciones
sequelize.models.tipohabitaciones.hasMany(sequelize.models.reservas, {
    foreignKey: 'tipoHabitaciones',
});
sequelize.models.reservas.belongsTo(sequelize.models.tipohabitaciones, {
    foreignKey: 'tipoHabitaciones',
});

// Relación entre reservas y habitaciones
sequelize.models.habitaciones.hasMany(sequelize.models.reservas, {
    foreignKey: 'idHabitaciones',
});
sequelize.models.reservas.belongsTo(sequelize.models.habitaciones, {
    foreignKey: 'idHabitaciones',
});

// Relación entre reservas y usuarios
sequelize.models.usuarios.hasMany(sequelize.models.reservas, {
    foreignKey: 'idUsuario',
});
sequelize.models.reservas.belongsTo(sequelize.models.usuarios, {
    foreignKey: 'idUsuario',
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("La base de datos ha sido sincronizada correctamente.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


export { sequelize }; // Asegúrate de exportar la instancia de Sequelize

