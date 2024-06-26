const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Si no hay token, devuelve Unauthorized
    }

    jwt.verify(token, 'your_secret_key', (err, user) => { // Asegúrate de que 'your_secret_key' es la correcta
        if (err) {
            return res.sendStatus(403); // Si el token es inválido, devuelve Forbidden
        }
        req.user = user; // Almacena la información del usuario en la solicitud
        next(); // Pasa al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;
