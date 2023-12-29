// 导入express
const express = require('express')
    // 创建服务器的实例对象
const app = express()

const joi = require('joi')
    // 导入并配置cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 封装res.cc 函数
app.use((req, res, next) => {
    // status 默认值为1 表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 配置解析Token的中间件
const expressJwt = require('express-jwt')
const config = require('./config')

app.use(expressJwt({
    secret: config.jwtSecretKey
}).unless({
    path: [/^\/api/]
}))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userInfoRouter = require('./router/userInfo')
    // 以my开头的接口,都是有权限的接口,需要进行Token身份认证
app.use('/api', userInfoRouter)

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
    // 为文章分类的路由挂载统一的访问前缀
app.use('/my/article', artCateRouter)

// 导入日志模块
const logDataRouter = require("./router/logData")
app.use('/api', logDataRouter)

// 导入仓库模块
const storageDataRouter = require("./router/storageData")
app.use('/api', storageDataRouter)

// 导入供应商与顾客模块
// 导入仓库模块
const pAndcRouter = require("./router/providerAndCustomer")
app.use('/api', pAndcRouter)

// 导入货物模块
const goodsRouter = require("./router/goods")
app.use('/api', goodsRouter)

// 导入入库订单模块
const inStorageRouter = require("./router/inStorage")
app.use('/api', inStorageRouter)

// 导入出库订单模块
const outStorageRouter = require("./router/outStorage")
app.use('/api', outStorageRouter)
    // 定义错误级别中间件
app.use((err, req, res, next) => {
        if (err instanceof joi.ValidationError) return res.cc(err)
        if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
        res.cc(err)
    })
    //启动服务器
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})