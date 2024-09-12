import TipoCliente from '../models/TipoCliente.js';

// Obtener todos los tipos de cliente
export const getTipoClientes = async (req, res) => {
    try {
        const tiposClientes = await TipoCliente.findAll();
        res.json(tiposClientes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un tipo de cliente por ID
export const getTipoClienteById = async (req, res) => {
    try {
        const tipoCliente = await TipoCliente.findByPk(req.params.id);
        if (tipoCliente) {
            res.json(tipoCliente);
        } else {
            res.status(404).json({ message: 'Tipo de cliente no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo tipo de cliente
export const createTipoCliente = async (req, res) => {
    try {
        const tipoCliente = await TipoCliente.create(req.body);
        res.status(201).json(tipoCliente);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un tipo de cliente
export const updateTipoCliente = async (req, res) => {
    try {
        const tipoCliente = await TipoCliente.findByPk(req.params.id);
        if (!tipoCliente) {
            return res.status(404).json({ message: 'Tipo de cliente no encontrado' });
        }
        await tipoCliente.update(req.body);
        res.json(tipoCliente);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un tipo de cliente
export const deleteTipoCliente = async (req, res) => {
    try {
        const result = await TipoCliente.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Tipo de cliente eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Tipo de cliente no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
