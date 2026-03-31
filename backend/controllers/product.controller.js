import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, image } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = await Product.create({ name, price, image });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, image } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, image }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
