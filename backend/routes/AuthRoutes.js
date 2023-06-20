import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    // Cria o token de autenticação
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      'segredo',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: 'Erro ao realizar o login' });
  }
});

export default router;
