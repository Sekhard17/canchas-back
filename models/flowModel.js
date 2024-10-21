const axios = require('axios')
const CryptoJS = require('crypto-js')

const API_KEY = 'YOUR_API'
const SECRET_KEY = 'YOUR_SECRET'
const FLOW_URL = 'https://sandbox.flow.cl/api/payment/create'

function generarFirma(params){
    const keys = Object.keys(params).sort()
    const stringToSign = keys.map(key => `${key}${params[key]}`).join('')
    return CryptoJS.HmacSHA256(stringToSign, SECRET_KEY).toString()
}

async function crearPago({ commerceOrder, amount, subject, email}) {
    const params = {
        apiKey: API_KEY,
        commerceOrder,
        subject,
        currency: 'CLP',
        amount,
        email,
        urlConfirmation: 'https://canchas-matices.fly.dev/api/flow/confirmacion',
        urlReturn: 'https://canchas-matices.fly.dev/api/flow/reserva-exitosa',

}

params.s = generarFirma(params)

const response = await axios.post(FLOW_API_URL, new URLSearchParams(params))
return response.data
}

module.exports = { crearPago }