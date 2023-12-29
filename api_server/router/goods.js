const express = require('express')

const router = express.Router()

const goods_handler = require('../router_handler/goods')
    // 查询货物列表
router.post("/getGoodsList", goods_handler.getGoodsList)
    // 新增/修改货物
router.post("/addAndUpdateGoods", goods_handler.addAndUpdateGoods)
    // 删除获取
router.post("/deleteGoods", goods_handler.deleteGoods)
module.exports = router