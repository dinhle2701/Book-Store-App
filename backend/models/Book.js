import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        trim: true
    },
    author: {
        type: String, 
        required: true, 
        trim: true
    },
    description: {
        type: String, 
        required: true, 
        trim: true
    },
    count: {
        type: String, 
        required: true, 
        trim: true
    },
    price: {
        type: String, 
        required: true, 
        trim: true
    },
    inStock: {
        type: String, 
        required: true, 
        trim: true
    },
    category: {
        type: String, 
        required: true, 
        trim: true
    },
    image: {
        type: String, 
        required: true, 
        trim: true
    },
    publishedDate: {
        type: String, 
        required: true, 
        trim: true
    },
}, { timestamps: true })