const express = require('express')

const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
    // 导入验证规则
const { reg_login_schema } = require('../schema/user')

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

// 获取用户列表
router.post('/getUserList', user_handler.getUserList)
    // 新增用户
router.post("/addUser", user_handler.addUser)
    // 修改用户权限
router.post("/updatePower", user_handler.updatePower)
    // 删除用户
router.post("/deleteUser", user_handler.deleteUser)
    // 设置用户信息
router.post("/updateUser", user_handler.updateUser)
    // 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

router.get('/getCount', user_handler.getCount)
module.exports = router