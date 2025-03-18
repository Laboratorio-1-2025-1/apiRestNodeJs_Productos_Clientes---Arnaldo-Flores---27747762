require('dotenv').config({ path: './././.env' });

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.EXTERNAL_PORT_BD
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database');
    release();
});

pool.getNow = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT NOW()');
        return result.rows[0].now;
    } catch (error) {
        console.error('Error al obtener la fecha y hora actual:', error);
    } finally {
        client.release();
    }
};

module.exports = pool;