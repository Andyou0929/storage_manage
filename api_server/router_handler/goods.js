const db = require('../db/index')
const { insert } = require("../utils/insertLogoData")

exports.getGoodsList = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `SELECT goods.id id,goods.name name,type,providerId,provider.name providerName
                FROM goods,provider
                WHERE goods.name LIKE '%${data.name}%' 
                AND type LIKE '%${data.type}%'
                AND provider.id = goods.providerId 
                `
    if (data.providerId !== "undefined") sql += `AND providerId = '${data.providerId}'`
    console.log(sql);
    db.query(sql, (err, result) => {
        console.log(err, result);
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: result,
            msg: ''
        })
    })
}

/* 
    新增或修改数据
*/
exports.addAndUpdateGoods = (req, res) => {
    const data = req.body
    let selectSql = `SELECT * FROM goods WHERE name="${data.name}" AND providerId = "${data.providerId}"`
    db.query(selectSql, (err, result) => {
        if (result.length === 1 && result[0].id !== data.id) {
            res.send({
                status: 1,
                msg: `此货物已被当前选择供应商添加，请勿重复`
            })
            return
        }
        let operation = ''
        let sql = ''
        if (!data.id) {
            operation = "新增货物"
            data.id = 'g' + new Date().getTime()
            sql = `INSERT INTO goods VALUES('${data.id}','${data.name}','${data.type}','${data.providerId}')`
        } else {
            operation = "修改货物"
            sql = `UPDATE goods SET name = '${data.name}',type = '${data.type}',providerId = '${data.providerId}'
                WHERE id = '${data.id}'`
        }
        console.log(sql);
        db.query(sql, (err, result) => {
            console.log(err, result);
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), operation)
            res.send({
                status: 0,
                data: true,
                msg: '操作成功'
            })
        })
    })
}

/* 
    删除数据
*/
exports.deleteGoods = (req, res) => {
    const data = req.body
    let selectSql = `SELECT sum(total) total FROM inventory WHERE goodsId = '${data.id}'`
    console.log(selectSql);
    db.query(selectSql, (err, result) => {
        console.log(result);
        if (result[0].total > 0) {
            res.send({
                status: 1,
                data: false,
                msg: "此货物在仓库存在订单量，无法删除"
            })
            return
        }
        let sql = `DELETE FROM goods WHERE id = '${data.id}'`
        console.log(sql);
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), "删除货物")
            res.send({
                status: 0,
                data: true,
                msg: '删除成功'
            })
        })
    })

}