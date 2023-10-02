const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(productData) {
    const products = this.getProductsFromFile();
    const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    const newProduct = { id: nextId, ...productData };
    products.push(newProduct);
    this.saveProductsToFile(products);

    console.log(`Producto '${newProduct.title}' agregado con éxito.`);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(product => product.id === id);

    if (!product) {
      console.log(`Producto con ID ${id} no encontrado.`);
    }

    return product;
  }

  updateProduct(id, updatedProductData) {
    let products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log(`Producto con ID ${id} no encontrado.`);
      return;
    }
    products[productIndex] = { id, ...updatedProductData };
    this.saveProductsToFile(products);

    console.log(`Producto con ID ${id} actualizado con éxito.`);
  }

  deleteProduct(id) {
    let products = this.getProductsFromFile();
    products = products.filter(product => product.id !== id);
    this.saveProductsToFile(products);
    console.log(`Producto con ID ${id} eliminado con éxito.`);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf8');
  }
}

module.exports = ProductManager;