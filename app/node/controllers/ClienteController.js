import Cliente from '../models/Cliente.js';
import TipoCliente from '../models/TipoCliente.js'; // Verifica la ruta correcta

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: { model: TipoCliente, as: 'tipoCliente' } // Incluir el tipo de cliente en la respuesta
        });
        console.log(clientes);  // Verifica la respuesta aquí
        res.json(clientes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
    try {
        const clienteone = await Cliente.findByPk(req.params.id, {
            include: { model: TipoCliente, as: 'tipoCliente' }
        });
        if (clienteone) {
            res.json(clienteone);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    try {
        const clientepost = await Cliente.create(req.body);
        res.status(201).json(clientepost);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    try {
        const clienteput = await Cliente.findByPk(req.params.id);
        if (!clienteput) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await clienteput.update(req.body);
        res.json(clienteput);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const result = await Cliente.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Cliente eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
