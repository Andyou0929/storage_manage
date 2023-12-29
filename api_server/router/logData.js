const express = require('express')

const router = express.Router()
const logoData_handler = require('../router_handler/logData')
router.post("/getLogData", logoData_handler.getLogData)
module.exports = router