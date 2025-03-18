// controller/clientsController.js
import * as sql from '../sql/clients.js'

// Expresión regular para validar el formato de un correo electrónico
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

// GET /api/clients - Obtener todos los clientes
export const getAllClients = async (req, res) => {
    await sql.getClients().then((c) => {
        if (!c) { res.status(404).json({ message: 'No hay clientes registrados' });}

        res.json({message: 'CLIENTES REGISTRADOS', 'Clientes': c});
    });
};

// GET /api/clients/active - Obtener todos los clientes
export const getAllClientsActive = async (req, res) => {
    await sql.getClientsByStatus('a').then((c) => {
        if (!c) { res.status(404).json({ message: 'No hay clientes activos' }); }

        res.json({message: 'CLIENTES ACTIVOS', 'Clientes': c});
    });
};

// GET /api/clients/delete - Obtener todos los clientes
export const getAllClientsDelete = async (req, res) => {
    await sql.getClientsByStatus('i').then((c) => {
        if (!c) { res.status(404).json({ message: 'No hay clientes eliminados' }); }

        res.json({message: 'CLIENTES ELIMINADOS', 'Clientes': c});
    });
};

// GET /api/clients/:id - Obtener un cliente por su ID
export const getClientById = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    await sql.getClientsById(id).then((c) => {
        if (!c) { res.status(404).json({ message: 'cliente no encontrado' });}

        res.status(201).json({c});
    });
};

// POST /api/clients - Crear un nuevo cliente
export const createClient = async (req, res) => {
    const { name, lastName, phone, email } = req.body;
    
    if (!name || !lastName || !phone || !email) {
        return res.status(400).json({ message: 'Todos los datos son requeridos' });
    }
    if (!isValidEmail(email)){
        return res.status(400).json({ message: 'Formato de correo electronico incorrecto' });
    }

    await sql.insertClient(name, lastName, phone, email, 'a').then((c) => {
        if (!c) { res.status(404).json({ message: 'No se registro el cliente' }); }
        res.status(201).json({message: 'NUEVO CLIENTE REGISTRADO', 'Cliente': c});
    });
};

// PUT /api/clients/:id - Actualizar un cliente existente
export const updateClient = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, lastName, phone, email } = req.body;

    if (email !== undefined && !isValidEmail(email)){
        return res.status(400).json({ message: 'Formato de correo electronico incorrecto' });
    }

    await sql.updateClient(name, lastName, phone, email, 'a', id).then((c) => {
        if (!c) { res.status(404).json({ message: 'No se actualizo el cliente' });}
        res.status(201).json({message: 'CLIENTE ACTUALIZADO', 'Cliente': c});
    });
};

// DELETE /api/clients/:id - Eliminar un cliente
export const deleteClient = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    await sql.deleteClient(id).then((c) => {
        if (!c) { res.status(404).json({ message: 'No se elimino el cliente' }); }
        res.status(201).json({message: 'CLIENTE ELIMINADO', 'Cliente': c});
    });
};

