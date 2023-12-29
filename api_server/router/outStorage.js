const express = require('express')

const router = express.Router()

const outStorage_handler = require('../router_handler/outStorage')
    // 查询入库订单列表
router.post("/getOutStorageList", outStorage_handler.getOutStorageList)
    // 新增/修改入库订单
router.post("/addAndUpdateOutStorage", outStorage_handler.addAndUpdateOutStorage)
    // 删除入库订单
router.post("/deleteOutStorage", outStorage_handler.deleteOutStorage)
module.exports = router