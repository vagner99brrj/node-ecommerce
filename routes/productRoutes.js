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
});

module.exports = router;