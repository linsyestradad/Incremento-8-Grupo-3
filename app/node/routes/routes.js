import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    deletedata, getdata, getdataone, postdata, putdata
} from '../controllers/controller.js';
import {
    deleteCliente, getClientes, getClienteById, createCliente, updateCliente
} from '../controllers/ClienteController.js';
import {
    deleteTipoCliente, getTipoClientes, getTipoClienteById, createTipoCliente, updateTipoCliente
} from '../controllers/TipoClienteController.js';

import Usuario from '../models/Usuario.js';

const router = express.Router();




//// CRUD DE USUARIOS
router.get('/usuario', getdata);
router.get('/usuario/:id', getdataone);
router.post('/usuario', postdata);
router.put('/usuario/:id', putdata);
router.delete('/usuario/:id', deletedata);




///// CRUD DE CLIENTES
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);



///// CRUD DE TIPOS DE CLIENTE
router.get('/tipos-clientes', getTipoClientes);
router.get('/tipos-clientes/:id', getTipoClienteById);
router.post('/tipos-clientes', createTipoCliente);
router.put('/tipos-clientes/:id', updateTipoCliente);
router.delete('/tipos-clientes/:id', deleteTipoCliente);




///// Endpoint para el inicio de sesión
router.post('/login', async (req, res) => {
    const { email, contrasenha } = req.body;

    try {
        console.log("Email recibido:", email);
        console.log("Contraseña recibida:", contrasenha);

        // Buscar al usuario por email
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario inválido' });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(contrasenha, user.contrasenha);

        console.log('Password Match:', validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;
