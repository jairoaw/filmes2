import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import FilmeRoute from "./routes/FilmeRoute.js";
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { connect } from '@planetscale/database'

dotenv.config();

// Cria uma aplicação Express
const app = express();

// Cria a conexão com o banco de dados MongoDB
const mongoURI = "mongodb+srv://mongoose:lnmmXvfic7ldwptC@cluster0.p07xarb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao banco de dados MongoDB Atlas'))
  .catch(error => console.log('Erro ao conectar ao banco de dados MongoDB Atlas:', error));

// Cria a conexão com o banco de dados MySQL
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

async function connectToMySQL() {
  try {
    const conn = await connect(config);
    console.log('Conectado ao banco de dados MySQL da Planetscale');
    const results = await conn.execute('SELECT 1 FROM dual WHERE 1 = ?', [1]);
    console.log('Query executada com sucesso:', results);
  } catch (error) {
    console.log('Erro ao conectar ao banco de dados MySQL:', error);
  }
}

connectToMySQL();

// Permite o uso do CORS (acesso a domínios externos da nossa API)
app.use(cors());

// Permitir enviar dados para a App no formato JSON
app.use(express.json());

// Rotas
app.use(FilmeRoute);

// Inicia o servidor backend na porta '5000'
app.listen(5000, () => {
  console.log("Aplicativo ouvindo na porta 5000");
});