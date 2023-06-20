import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'filmes2', 
});

export default connection;
