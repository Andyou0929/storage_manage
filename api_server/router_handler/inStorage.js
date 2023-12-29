const db = require('../db/index')
const { insert } = require("../utils/insertLogoData")

exports.getInStorageList = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `SELECT DISTINCT in_storage.id id,goods.name goodsName,storagedata.name storageName,goodsId,providerId,total,user.name userName,user.id userId,time,provider.name providerName,user.phone userPhone,storageId
    FROM in_storage,goods,storagedata,provider,user
    WHERE goods.id = goodsId
    AND storagedata.id = storageId
    AND provider.id = goods.providerId
    AND user.id = userId
    AND time LIKE '%${data.time}%'
    `
    if (data.providerId !== "undefined") sql += `AND providerId = '${data.providerId}' `
    if (data.goodsId !== "undefined") sql += `AND goodsId = '${data.goodsId}' `
    if (data.storageId !== "undefined") sql += `AND storageId = '${data.storageId}' `
    if (data.userId !== "undefined") sql += `AND userId = '${data.userId}' `
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
exports.addAndUpdateInStorage = (req, res) => {
    const data = req.body
    let operation = ''
    let sql = ''
    if (!data.id) {
        operation = "新增入库订单"
        data.id = 'io' + new Date().getTime()
        sql = `INSERT INTO in_storage VALUES('${data.id}','${data.goodsId}','${data.storageId}',${data.total},'${data.userId}','${data.time}')`
    } else {
        operation = "修改入库订单"
        sql = `UPDATE in_storage SET total = ${data.total}
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
}

/* 
    删除数据
*/
exports.deleteInStorage = (req, res) => {
    const data = req.body
    let sql = `DELETE FROM in_storage WHERE id = '${data.id}'`
    console.log(sql);
    db.query(sql, data, (err, results) => {
        if (err) return res.cc(err)
        insert(req.headers["access-token"].replace("Bearer ", ""), "删除入库订单")
        res.send({
            status: 0,
            data: true,
            msg: '删除成功'
        })
    })

}