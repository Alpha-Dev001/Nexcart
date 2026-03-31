import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from "./config/db.js";
import productRouter from "./routes/product.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// Determine if we're in development or production
const isProduction = process.env.NODE_ENV === 'production';

// Serve static files from frontend build in both development and production
app.use(express.static(join(__dirname, "../frontend/dist")));

// Also serve Vite assets in development
if (!isProduction) {
    app.use(express.static(join(__dirname, "../frontend")));
}

connectDB().then(() => {
    app.get("/api", (req, res) => {
        res.json({ message: "Nexcart API is running!" });
    });

    // API routes
    app.use("/api/products", productRouter);

    // Serve frontend for all other routes (catch-all) - use regex instead of wildcard
    app.get(/^(?!\/api).*/, (req, res) => {
        // Serve the frontend index.html file directly
        res.sendFile(join(__dirname, "../frontend/index.html"));
    });

    app.listen(port, () => {
        console.log(`Nexcart server is running on port ${port}`);
        console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});

// Graceful error handling for unhandled promises/exceptions
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    process.exit(1);
});