const express = require('express')

const router = express.Router()

const artcate_handler = require('../router_handler/artcate')
// 获取文字分类的列表数据
router.get('/cates',artcate_handler.getArticleCates)

const expressJoi = require('@escook/express-joi')

const {add_cate_schema,delete_cate_schema} = require('../schema/artcate')

// 新增文字分类的接口
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)

// 删除文字分类的接口
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteArticleCates)
// 向外共享路由对象
module.exports = router
