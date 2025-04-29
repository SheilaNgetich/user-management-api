import mysql2 from "mysql2";
import dotenv from "dotenv";

// Loading  environment variables
dotenv.config();

process.env.USERNAME = 'root';

//creating a connection to the database
const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

// Querying the database to test the connection
pool.query('SELECT 1',(err, result) => {
    if (err) {
        console.error("Database connection failed",err.message);
    }else{
        console.log("Successfully connected to the db");
    }
  });

  export default pool;