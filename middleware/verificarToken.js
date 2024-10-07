//backend/middlewares/verificarToken.js
//Este archivo contiene un middleware que verifica si el token proporcionado es válido para acceder a las rutas y sesiones protegidas.
const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' })
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = verificado; // Añadir el usuario decodificado al objeto de solicitud para usarlo en el controlador
    next(); // Continuar con la siguiente función del middleware
  } catch (error) {
    res.status(403).json({ error: 'Token inválido.' })
  }
}

module.exports = verificarToken
