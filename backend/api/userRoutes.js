const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Librería para hash de contraseñas
const jwt = require('jsonwebtoken'); // Librería para manejar tokens JWT
const { User } = require('../models'); // Importa el modelo de usuario

// Ruta para registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'A user with this username already exists' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // El número 10 es el costo del hash

    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = await User.create({
      username,
      password: hashedPassword // Guarda la contraseña hasheada
    });

    res.status(201).json(newUser); // Devuelve el usuario creado
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'An error occurred while trying to register the user' });
  }
});

// Ruta para inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca al usuario por nombre de usuario
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compara la contraseña ingresada con la contraseña almacenada (hasheada)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Aquí puedes generar un token JWT para manejar la sesión del usuario
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    // Devuelve el token como respuesta (podrías devolver más información según necesites)
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred while trying to login' });
  }
});

module.exports = router;
