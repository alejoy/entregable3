const express = require('express');
const app = express();
const port = 8080;

const filePath = './productos.json'; 
const ProductManager = require('./ProductManager'); 

const manager = new ProductManager(filePath);

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit)) {
    const products = manager.getProducts().slice(0, limit);
    res.json({ products });
  } else {
    res.json({ products: manager.getProducts() });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid); 

  const product = manager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
