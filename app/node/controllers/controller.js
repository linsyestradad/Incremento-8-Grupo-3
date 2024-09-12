import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getdata = async (req, res) => {
    try {
        const Usuarios = await Usuario.findAll();
        res.json(Usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const getdataone = async (req, res) => {
    try {
        const UsuarioOne = await Usuario.findByPk(req.params.id);
        if (UsuarioOne) {
            res.json(UsuarioOne);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo usuario
export const postdata = async (req, res) => {
    try {
        const { contrasenha, ...rest } = req.body;

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenha, salt);

        // Crear el usuario con la contraseña hasheada
        await Usuario.create({ ...rest, contrasenha: hashedPassword });

        res.json({ "Message": "Registro creado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un usuario
export const putdata = async (req, res) => {
    const { id } = req.params;
    const { contrasenha, nombreComp, email, fechaNaci } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se va a actualizar la contraseña
        if (contrasenha) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasenha, salt);
            usuario.contrasenha = hashedPassword;
        }

        // Actualizar otros campos
        usuario.nombreComp = nombreComp || usuario.nombreComp;
        usuario.email = email || usuario.email;
        usuario.fechaNaci = fechaNaci || usuario.fechaNaci;

        // Guardar los cambios en la base de datos
        await usuario.save();

        res.json({ "Message": "Registro actualizado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un usuario
export const deletedata = async (req, res) => {
    try {
        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ "Message": "Registro eliminado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
