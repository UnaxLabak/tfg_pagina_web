const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: 'A user with this username already exists' });
  }
  
  User.create({
    username,
    password
  })
    .then(user => res.json(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while trying to add the user' });
    });
});


router.get('/hello', (req, res) => {
  res.send('Hello World');
});


module.exports = router;