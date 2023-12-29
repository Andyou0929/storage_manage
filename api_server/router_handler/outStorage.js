const db = require('../db/index')
const { insert } = require("../utils/insertLogoData")

exports.getOutStorageList = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `SELECT DISTINCT out_storage.id id,goods.name goodsName,storagedata.name storageName,goodsId,providerId,total,user.name userName,user.id userId,time,provider.name providerName,user.phone userPhone,storageId,customerId,customer.name customerName
    FROM out_storage,goods,storagedata,provider,user,customer
    WHERE goods.id = goodsId
    AND storagedata.id = storageId
    AND provider.id = goods.providerId
    AND user.id = userId
    AND customer.id = customerId
    AND time LIKE '%${data.time}%'
    `
    if (data.providerId !== "undefined") sql += `AND providerId = '${data.providerId}' `
    if (data.goodsId !== "undefined") sql += `AND goodsId = '${data.goodsId}' `
    if (data.storageId !== "undefined") sql += `AND storageId = '${data.storageId}' `
    if (data.userId !== "undefined") sql += `AND userId = '${data.userId}' `
    if (data.customerId !== "undefined") sql += `AND customerId = '${data.customerId}' `
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
exports.addAndUpdateOutStorage = (req, res) => {
    const data = req.body
    let selectSql = `SELECT total FROM inventory WHERE goodsId = '${data.goodsId}' AND storageId = '${data.storageId}'`
    console.log(selectSql);
    db.query(selectSql, (err, result) => {
        console.log();
        console.log(data.total * 1);
        if (!result.length) {
            res.send({
                status: 1,
                data: false,
                msg: '此货物无库存量'
            })
            return
        }
        if (result[0].total <= (data.total * 1)) {
            res.send({
                status: 1,
                data: false,
                msg: '所出库货物存储量超出'
            })
            return
        }
        let operation = ''
        let sql = ''
        if (!data.id) {
            operation = "新增出库订单"
            data.id = 'is' + new Date().getTime()
            sql = `INSERT INTO out_storage VALUES('${data.id}','${data.goodsId}','${data.storageId}',${data.total},'${data.customerId}','${data.userId}','${data.time}')`
        } else {
            operation = "修改出库订单"
            sql = `UPDATE out_storage SET total = ${data.total} customerId = ${data.customerId}
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
exports.deleteOutStorage = (req, res) => {
    const data = req.body
    let sql = `DELETE FROM out_storage WHERE id = '${data.id}'`
    console.log(sql);
    db.query(sql, data, (err, results) => {
        if (err) return res.cc(err)
        insert(req.headers["access-token"].replace("Bearer ", ""), "删除出库订单")
        res.send({
            status: 0,
            data: true,
            msg: '删除成功'
        })
    })

}