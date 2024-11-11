// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Ruta para manejar las notificaciones del webhook de Mercado Pago
router.post('/webhook', webhookController.handleWebhook);

module.exports = router;
