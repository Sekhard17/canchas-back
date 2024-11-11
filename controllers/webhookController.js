// controllers/webhookController.js
const Pago = require('../models/Pago');

exports.handleWebhook = async (req, res) => {
  try {
    const payment = req.body;

    // Verificar que la notificación es sobre un pago
    if (payment.type === 'payment' && payment.data && payment.data.id) {
      const paymentId = payment.data.id;

      // Consultar la información del pago a través de tu modelo Pago
      // Para obtener detalles del pago y actualizar su estado
      try {
        const pagoDetalles = await Pago.obtenerPorId(paymentId);

        if (pagoDetalles) {
          // Actualizar el estado del pago con la información recibida
          const estadoPago = payment.action; // Aquí puedes ajustar el campo según la información de Mercado Pago (e.g., 'approved', 'rejected')

          await Pago.actualizarPago(paymentId, {
            estado: estadoPago,
          });

          console.log(`Pago con ID ${paymentId} actualizado a estado: ${estadoPago}`);
        }
      } catch (err) {
        console.error(`Error al obtener o actualizar el pago con ID ${paymentId}: `, err);
      }
    }

    // Responder a Mercado Pago para confirmar la recepción de la notificación
    res.sendStatus(200);
  } catch (error) {
    console.error('Error procesando el webhook:', error);
    res.sendStatus(500);
  }
};
