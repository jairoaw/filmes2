import mongoose from "mongoose";

// Define o schema do filme no mongodb

const Filme = new mongoose.Schema({
  titulo: {
    type: String,
    required: true, // campo obrigatório
    trim: true, // remove espaços em branco desnecessários
    maxlength: 100, // tamanho máximo de 100 caracteres
    index: true // índice para melhorar desempenho de consultas
  },
  sinopse: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  capa_url: {
    type: String,
    required: true
  },
  data_lancamento: {
    type: Date,
    default: Date.now,
    required: true
  },
  genero: {
    type: String,
    required: true,
    enum: ["Ação", "Comédia", "Drama", "Ficção científica", "Terror"] // valores permitidos para o campo
  },
  trailer: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  }
});

// Registra o model Filme em nossa aplicação informando seu schema
export default mongoose.model('Filmes', Filme);
