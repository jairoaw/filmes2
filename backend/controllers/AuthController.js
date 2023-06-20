import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ErrorHandler } from '../utils/error.js';

const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar se o email já está em uso
    const [existingUser] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUser.length) {
      throw new ErrorHandler(400, 'O email fornecido já está em uso');
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar o usuário no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    if (result.affectedRows !== 1) {
      throw new ErrorHandler(500, 'Erro ao registrar o usuário');
    }

    // Gerar o token de autenticação
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export default register;
