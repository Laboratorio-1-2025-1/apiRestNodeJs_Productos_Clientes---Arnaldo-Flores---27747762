// index.js
const express = require('express');
const pool = require('./utils/conexionBd');

const productRoutes = require('./routes/productRoutes');
const clientsRoutes = require('./routes/clientsRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Rutas de la API para productos
app.use('/api/products', productRoutes);

// Rutas de la API para clientes
app.use('/api/clients', clientsRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de productos y clientes');
    pool.getNow().then((now) => {
        console.log('Fecha y hora actual:', now);
    });
});

// Inicio del servidor
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});

