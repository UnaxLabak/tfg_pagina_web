const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./api/userRoutes');
const ariketaRoutes = require('./api/ariketaRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000' // Allow only this origin
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/docker', ariketaRoutes);

// Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.listen(port, () => console.log(`Server is running on port ${port}`));