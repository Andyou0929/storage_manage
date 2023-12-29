const express = require('express')

const router = express.Router()
    // 导入用户路由处理函数对应的模块
const storageData_handler = require('../router_handler/storageData')

// 获取仓库列表
router.post("/getStorageList", storageData_handler.getStorageList)
    // 新增或删除仓库
router.post("/addAndUpdateStorage", storageData_handler.addAndUpdateStorage)
    // 删除仓库
router.post("/deleteStorage", storageData_handler.deleteStorage)

module.exports = router