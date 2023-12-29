const db = require('../db/index')
const {request} = require("express");

exports.getArticleCates = (req, res) => {
    // 根据分类的状态，获取未被删除的分类列表数据
    // is_delete 为0表示没有被删除
    const sqlStr = 'select * from ev_article_cate where is_delete = 0 order by id desc'
    db.query(sqlStr,(err,results)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            data:results,
            msg:'获取列表数据成功'
        })
    })
}

exports.addArticleCates = (req,res)=>{
    const sqlStr = 'SELECT * FROM ev_article_cate WHERE name = ? or alias = ?'
    db.query(sqlStr,[req.body.name,req.body.alias],(err,results)=>{
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换重试')
        if (results.length === 1 && results[0].namae === req.body.name) return res.cc('分类名已被占用，请更换重试')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名已被占用，请更换重试')
        const sql = 'INSERT INTO ev_article_cate SET ?'
        db.query(sql,req.body,(err,results)=>{
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加分类失败')
            res.cc('新增分类成功',0)
        })
    })
}

exports.deleteArticleCates = (req,res)=>{
const sqlStr = 'UPDATE ev_article_cate SET is_delete = 1 WHERE id =?'
    db.query(sqlStr,req.params.id,(err,results)=>{
        if (err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除文字分类失败')
        res.cc('删除文字分类成功',0)
    })
}
