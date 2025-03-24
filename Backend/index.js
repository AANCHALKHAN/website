import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
dotenv.config(); 

app.use(cors({
    origin: 'https://timely-seahorse-c1785f.netlify.app', // Allow frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

const app = express();
const port = 4000;

// app.use(cors());

app.use(express.json());
app.use('/', userRoutes)

const dbURI = process.env.DB_URI;
// const dbURI = "mongodb://localhost:27017"

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
