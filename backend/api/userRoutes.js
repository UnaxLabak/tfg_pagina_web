const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importa el modelo de usuario
const authenticateToken = require('../middlewares/authMiddleware'); // Importar el middleware


// Ruta para registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Registering user:', username);

    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      console.log('A user with this username already exists:', username);
      return res.status(400).json({ error: 'A user with this username already exists' });
    }

    // Crea un nuevo usuario con la contraseña en texto plano
    const newUser = await User.create({
      username,
      password // Guarda la contraseña en texto plano
    });

    console.log('User registered successfully:', username);
    res.status(201).json(newUser); // Devuelve el usuario creado
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'An error occurred while trying to register the user', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Attempting login for user:', username);

    // Busca al usuario por nombre de usuario
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', username);

    // Compara la contraseña ingresada con la contraseña almacenada (en texto plano)
    if (password !== user.password) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ error: 'Invalid password' });
    }

    console.log('Password valid for user:', username, user.userid);

    // Genera un token JWT para manejar la sesión del usuario
    const token = jwt.sign({ userid: user.userid }, 'your_secret_key', { expiresIn: '1h' });

    console.log('JWT token generated for user:', username);

    // Devuelve el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'An error occurred while trying to login', details: error.message });
  }
});

module.exports = router;
