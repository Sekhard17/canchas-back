const express = require('express')
const router = express.Router()
const flowController = require('../controllers/flowController')

router.post('/crear', flowController.procesarPago)
router.post('/confirmacion', flowController.confirmarPago)

module.exports = router