const express = require('express')

const router = express.Router()

const inStorage_handler = require('../router_handler/inStorage')
    // 查询入库订单列表
router.post("/getInStorageList", inStorage_handler.getInStorageList)
    // 新增/修改入库订单
router.post("/addAndUpdateInStorage", inStorage_handler.addAndUpdateInStorage)
    // 删除入库订单
router.post("/deleteInStorage", inStorage_handler.deleteInStorage)
module.exports = router