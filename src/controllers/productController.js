// controllers/productController.js
import * as sql from '../sql/products.js'

// GET /api/products - Obtener todos los productos
export const getAllProducts = async (req, res) => {
    await sql.getProducts().then((p) => {
            if (!p) { res.status(404).json({ message: 'No hay productos registrados' });}
    
            res.json({message: 'PRODUCTOS REGISTRADOS', 'Productos': p});
        });
};

// GET /api/products/:id - Obtener un producto por su ID
export const getProductById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    await sql.getProductsById(id).then((p) => {
            if (!p) { res.status(404).json({ message: 'producto no encontrado' });}
    
            res.status(201).json({p});
        });
};

// POST /api/products - Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { nombre, precio, descripcion, stock } = req.body;
    if (!nombre || precio == null) {
        return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    await sql.insertProduct(nombre, descripcion, precio, stock).then((p) => {
            if (!p) { res.status(404).json({ message: 'No se registro el producto' }); }
            res.status(201).json({message: 'NUEVO PRODUCTO REGISTRADO', 'Producto': p});
        });
};

// PUT /api/products/:id - Actualizar un producto existente
export const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, precio, descripcion, stock } = req.body;
    
    await sql.updateProduct(nombre, descripcion, precio, stock, id).then((p) => {
            if (!p) { res.status(404).json({ message: 'No se actualizo el producto' }); }
            res.status(201).json({message: 'PRODUCTO ACTUALIZADO', 'producto': p});
        });
};

// DELETE /api/products/:id - Eliminar un producto
export const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    await sql.deleteProduct(id).then((p) => {
            if (!p) { res.status(404).json({ message: 'No se elimino el producto' }); }
            res.status(201).json({message: 'PRODUCTO ELIMINADO', 'producto': p});
        });

};