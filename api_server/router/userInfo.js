// 导入express
const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入用户信息的处理函数模块
const userInfo_handler = require('../router_handler/userInfo')

// 导入验证数据的中间件
const expressJoi  = require('@escook/express-joi')

// 导入需要的验证规则
const {update_userinfo_schema,update_password_schema,update_avatar_schema}  = require('../schema/user')

// 获取用户的基本信息
router.get('/userInfo',userInfo_handler.getUserInfo)
// 更新用户信息的路由
router.post('/userInfo',expressJoi(update_userinfo_schema),userInfo_handler.updateUserInfo)
// 修改密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userInfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),userInfo_handler.updateAvatar)

// 向外共享路由对象
module.exports = router
