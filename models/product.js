const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
    type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
 stack: {
    type: Number,
    default: 0,
    min: 0
},
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});
const Product = mongoose.model('Product', ProductSchema);
module.exports =  Product;
