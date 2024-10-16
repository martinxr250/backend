import { sequelize } from "../databases/databases.js";
import {Op} from 'sequelize';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async () => {
    console.log("llego al servicio")
    const usuarios = await sequelize.models.usuarios.findAll()
    return usuarios.map(usuario => usuario.dataValues)
}

const createUsuario = async (usuario) => {
     try {
        const hashed = await bcrypt.hash(usuario.contrasena, 10)

        const createdUser = await sequelize.models.usuarios.create(
            {
                user_name: usuario.user_name,
                correo: usuario.correo,
                contrasena: hashed,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                es_activo: 1,
                idRol: 2
            }
        )

        return createdUser.dataValues
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') { // si viola las restricciones UNIQUE de nombre de usuario
            // Manejar el error de restricción única
            return { error: 'Ya existe un usuario con ese nombre' };
        } else {
            // Manejar otros errores
            console.log("ERROR AL CREAR USUARIO: ", error);
            return { error: 'Error al crear el usuario.' };
        }
    }
}

const getUsuarioByCorreo = async (correo) => {
    const usuario = await sequelize.models.usuarios.findOne({
        where: {
            correo: correo
        }
    })
    return usuario.dataValues
}

const login = async (userData) => {
     const usuario = await sequelize.models.usuarios.findOne({
        where: {
            user_name: userData.user_name
        }
    })

    if (usuario) {
        const passwordMatch = await bcrypt.compare(userData.contrasena, usuario.dataValues.contrasena)
        if (passwordMatch) {
            const token = jwt.sign(
                {
                    id: usuario.dataValues.id,
                    nombre: usuario.dataValues.nombre,
                    apellido: usuario.dataValues.apellido,
                    correo: usuario.dataValues.correo,
                    idRol: usuario.dataValues.idRol
                }, "poronga", { expiresIn: '7d' }
            );

            return {
                id: usuario.dataValues.id,
                usuario: usuario.dataValues.user_name,
                idRol: usuario.dataValues.idRol,
                token: token
            }

        } else {
            return { error: "Usuario no encontrado" } // anda
        }
    } else {
        return { error: "Usuario no encontrado" } // anda
    }
}

const updateUsuario = async (userData) => {
    try {
        // Buscar al usuario por su id
        const usuario = await sequelize.models.usuarios.findOne({
            where: {
                id: userData.id  // Se utiliza el id para la búsqueda
            }
        });

        if (usuario) {
            console.log(usuario);
            const updatedFields = {};
            if (userData.correo) updatedFields.correo = userData.correo;
            if (userData.nombre) updatedFields.nombre = userData.nombre;
            if (userData.apellido) updatedFields.apellido = userData.apellido;
            if (userData.user_name) updatedFields.user_name = userData.user_name;

            // Actualizar los campos del usuario
            await sequelize.models.usuarios.update(updatedFields, {
                where: {
                    id: usuario.id  // Actualiza basado en el id, sin modificarlo
                }
            });

            return { message: "Usuario actualizado correctamente" };
        } else {
            return { error: "Usuario no encontrado" };
        }
    } catch (error) {
        console.log("ERROR AL ACTUALIZAR USUARIO: ", error);
        return { error: "Error al actualizar el usuario." };
    }
};


const usuarios_services = {
    getAll,
    createUsuario,
    login,
    updateUsuario,
    getUsuarioByCorreo
}

export { usuarios_services }