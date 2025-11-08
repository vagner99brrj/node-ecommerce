const express = require('express');
const router = express.Router();
const  Product = require('../models/product');

// Create a new product 
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    }catch (error) {
        // Handle validation errors and duplicate key errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Product name must be unique.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }

   router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Produtos encontrados com sucesso!',
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar produtos',
            error: error.message
        });
    }   
    
});
   

module.exports = router;