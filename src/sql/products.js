const pool = require('../utils/conexionBd.js');

const getProducts = async () => {
    let connection;
    let sql = 'SELECT * FROM productos';
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

const getProductsById = async (id) => {
    let connection;
    let sql = 'SELECT * FROM productos WHERE id = $1';
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

const insertProduct = async (nombre, descripcion, precio, stock) => {
    let connection;
    let sql = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [nombre, descripcion || '', precio, stock || 0]);
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

const updateProduct = async (nombre, descripcion, precio, stock, id) => {

    getProductsById(id).then((c) => {
        if (!c) { return null; }

        nombre = nombre || c[0].nombre;
        descripcion = descripcion || c[0].descripcion;
        precio = precio || c[0].precio;
        stock = stock || c[0].stock;
    });

    let connection;
    let sql = 'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *';
    try {
        connection = await pool.connect();
        const result = await connection.query(sql, [nombre, descripcion, precio, stock, id]);
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

const deleteProduct = async (id) => {
    let connection;
    let sql = 'DELETE FROM productos WHERE id = $1 RETURNING *';
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

module.exports = {
    getProducts,
    getProductsById,
    insertProduct,
    updateProduct,
    deleteProduct
};