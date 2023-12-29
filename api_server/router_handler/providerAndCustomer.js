const db = require('../db/index')
const { request } = require("express");
const { insert } = require("../utils/insertLogoData")

/* 
    查询数据列表
    type : 0        1
          供应商    客户
*/
exports.getPADList = (req, res) => {
    const data = req.body
    const sql = `SELECT * 
                FROM ${data.type == 0 ? 'provider' : 'customer'} 
                WHERE name LIKE '%${data.name}%' 
                AND address LIKE '%${data.address}%'
                AND phone LIKE '%${data.phone}%'`
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
exports.addAndUpdatePAC = (req, res) => {
    const data = req.body
    let selectSql = `SELECT * FROM ${data.type == 0 ? 'provider' : 'customer'} WHERE name="${data.name}"`
    db.query(selectSql, (err, result) => {
        if (result.length === 1 && result[0].id !== data.id) {
            res.send({
                status: 1,
                msg: `${data.type == 0 ? '供应商' : '客户'}名已被占用，请更换`
            })
            return
        }
        let operation = ''
        let sql = ''
        if (!data.id) {
            operation = "新增" + (data.type == 0 ? "供应商" : "客户")
            data.id = ((data.type == 0 ? "p" : "c") + new Date().getTime())
            sql = `INSERT INTO ${data.type == 0 ? 'provider' : 'customer'} VALUES('${data.id}','${data.name}','${data.address}','${data.phone}')`
        } else {
            operation = "修改" + (data.type == 0 ? "供应商" : "客户")
            sql = `UPDATE ${data.type == 0 ? 'provider' : 'customer'} SET name = '${data.name}',address = '${data.address}',phone = '${data.phone}'
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
exports.deletePAC = (req, res) => {
    const data = req.body
    let selectSql = ""
    if (data.type == "0") {
        selectSql = `SELECT sum(total) total FROM goods,inventory WHERE providerId = '${data.id}'  AND inventory.goodsId = goods.id`
    } else {
        selectSql = `SELECT COUNT(customerId) total FROM out_storage WHERE customerId = '${data.id}'`
    }
    console.log(selectSql);
    db.query(selectSql, (err, result) => {
        console.log(result);
        if (result[0].total > 0) {
            res.send({
                status: 1,
                data: false,
                msg: (data.type == 0 ? "此供应商在仓库中存在货物，" : "此客户存在出仓订单，") + "无法删除"
            })
            return
        }
        let sql = `DELETE FROM ${data.type == 0 ? 'provider' : 'customer'} WHERE id = '${data.id}'`
        console.log(sql);
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), "删除" + (data.type == 0 ? "供应商" : "客户"))
            res.send({
                status: 0,
                data: true,
                msg: '删除成功'
            })
        })
    })

}