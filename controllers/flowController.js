const { crearPago } = require('../models/flowModel')

exports.procesarPago = async (req, res) => {
    try {
        const { commerceOrder, amount, subject, email } = req.body
        const pago = await crearPago({ commerceOrder, amount, subject, email })
        res.json(pago)
    } catch (error) {
        console.error('Error al crear el pago', error)
        res.status(500).json({ message: 'Error al procesar el pago' })
    }
}

exports.confirmarPago = (req, res) => {
    const {token} = req.body
    console.log('Confirmación recibida con token', token)

    //Validación el estado del pago

    res.status(200).json({message: 'Pago confirmado'})

}