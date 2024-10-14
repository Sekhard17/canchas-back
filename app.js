// app.js - Configuración principal del servidor
require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const usuariosRoutes = require('./routes/usuarioRoutes')
const canchasRoutes = require('./routes/canchasRoutes')
const reservasRoutes = require('./routes/reservasRoutes')
const solicitudesRoutes = require('./routes/solicitudesRoutes')
const respuestaSolicitudesRoutes = require('./routes/respuestaSolicitudesRoutes')
const gananciasRoutes = require('./routes/gananciasRoutes')
const pagosRoutes = require('./routes/pagosRoutes')
const auditoriaRoutes = require('./routes/auditoriaRoutes')
const reportesRoutes = require('./routes/reportesRoutes')
const notificacionesRoutes = require('./routes/notificacionesRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes') // Nueva ruta para el dashboard
const database = require('./config/database') // No necesitamos llamar a connect()

// Configuración del puerto
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Rutas
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/canchas', canchasRoutes)
app.use('/api/reservas', reservasRoutes)
app.use('/api/solicitudes', solicitudesRoutes)
app.use('/api/respuestas-solicitudes', respuestaSolicitudesRoutes)
app.use('/api/ganancias', gananciasRoutes)
app.use('/api/pagos', pagosRoutes)
app.use('/api/auditoria', auditoriaRoutes)
app.use('/api/reportes', reportesRoutes)
app.use('/api/notificaciones', notificacionesRoutes)
app.use('/api/dashboard', dashboardRoutes) // Nueva ruta para el dashboard

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})