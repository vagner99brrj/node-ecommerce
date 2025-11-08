const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Product name must be unique.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
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
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar o produto',
            error: error.message
        });
    }
});

module.exports = router;