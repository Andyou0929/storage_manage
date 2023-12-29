const express = require('express')

const router = express.Router()
    // 导入用户路由处理函数对应的模块
const providerAndCustomer_handler = require('../router_handler/providerAndCustomer')
    // 查询供应商或客户列表
router.post('/getPADList', providerAndCustomer_handler.getPADList)

// 新增或修改供应商或客户 
router.post('/addAndUpdatePAC', providerAndCustomer_handler.addAndUpdatePAC)

// 删除供应商或客户
router.post('/deletePAC', providerAndCustomer_handler.deletePAC)
module.exports = router