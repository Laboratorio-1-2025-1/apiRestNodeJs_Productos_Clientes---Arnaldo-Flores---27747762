const pool = require('../utils/conexionBd.js');

const getClients = async () => {
    let connection;
    let sql = 'SELECT * FROM clientes';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getClientsById = async (id) => {
    let connection;
    let sql = 'SELECT * FROM clientes WHERE id = $1';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getClientsByStatus = async (status) => {
    let connection;
    let sql = 'SELECT * FROM clientes WHERE status = $1';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [status]);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const insertClient = async (nombre, apellido, telefono, email, estado) => {
    let connection;
    let sql = 'INSERT INTO clientes (nombre, apellido, telefono, email, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [nombre, apellido, telefono, email, estado]);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const updateClient = async (nombre, apellido, telefono, email, estado, id) => {

    getClientsById(id).then((c) => {
        if (!c) {
            return null;
        }
        nombre = nombre || c[0].nombre;
        apellido = apellido || c[0].apellido;
        telefono = telefono || c[0].telefono;
        email = email || c[0].email;
        estado = estado || c[0].status;
    });

    let connection;
    let sql = 'UPDATE clientes SET nombre = $1, apellido = $2, telefono = $3, email = $4, status = $5 WHERE id = $6 RETURNING *';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [nombre, apellido, telefono, email, estado, id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const deleteClient = async (id) => {
    let connection;
    let sql = 'UPDATE clientes SET status = $1 WHERE id = $2 RETURNING *';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, ['i', id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    getClients,
    getClientsById,
    getClientsByStatus,
    insertClient,
    updateClient,
    deleteClient
};