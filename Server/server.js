import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from '../Server/Routes/userRoutes.js';

// Loading  environment variables
dotenv.config();

// Create an instance of an Express application
const app = express();

// CORS middleware which allows the  backend to accept requests from any domain
app.use(cors());
// allows incoming requests from the frontend to be parsed into JSON
app.use(express.json());
// parses incoming form data (URL-encoded format) from the frontend into JSON
app.use(express.urlencoded({extended : false}));

// Routes
app.use('/users', userRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Server is running");
});

export default app;