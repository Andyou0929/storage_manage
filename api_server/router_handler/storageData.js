const db = require('../db/index')
const { request, query } = require("express");
const { insert } = require("../utils/insertLogoData")

exports.getStorageList = (req, res) => {
    const data = req.body
    const sql = `SELECT * 
                FROM storageData 
                WHERE name LIKE '%${data.name}%' 
                AND address LIKE '%${data.address}%'
                AND status LIKE '%${data.status == 'undefined' ? '' : data.status}%'
                And openDate LIKE '%${data.openDate == 'undefined' ? '' : data.openDate}%'`
    console.log(sql);
    db.query(sql, (err, result) => {
        let data = result
        const selectGoods = `SELECT goods.name name,storageId,goods.type type,phone providerPhone,total,provider.name providerName FROM inventory,goods,provider 
        WHERE inventory.goodsId = goods.id 
        AND provider.id = goods.providerId`
        db.query(selectGoods, (err, resultGoods) => {
            data.forEach(item => {
                item.goods = []
                resultGoods.forEach(good => {
                    console.log(good);
                    if (item.id == good.storageId) {
                        item.goods.push(good)
                    }
                });
            });
            console.log(err, result);
            if (err) return res.cc(err)
            res.send({
                status: 0,
                data,
                msg: ''
            })
        })
    })
}

exports.addAndUpdateStorage = (req, res) => {
    const data = req.body
    let selectSql = `SELECT * FROM storageData WHERE name="${data.name}"`
    db.query(selectSql, (err, result) => {
        if (result.length === 1 && result[0].id !== data.id) {
            res.send({
                status: 1,
                msg: '仓库名已被占用，请更换'
            })
            return
        }
        let operation = ''
        let sql = ''
        if (!data.id) {
            operation = "新增仓库"
            data.id = "s" + new Date().getTime()
            sql = `INSERT INTO storageData VALUES('${data.id}','${data.name}','${data.address}','${data.openDate}',${data.status})`
        } else {
            operation = "修改仓库"
            sql = `UPDATE storageData SET name = '${data.name}',address = '${data.address}',status = ${data.status},openDate = '${data.openDate}'
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

// 设置仓库开启状态
exports.updateStrongeStatus = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `UPDATE storageData set status = ${data.power == 0 ? 1 : 0} WHERE id = "${data.id}"`
    console.log(sql);
    db.query(sql, data, (err, results) => {
        if (err) return res.cc(err)
        insert(req.headers["access-token"].replace("Bearer ", ""), "设置用户权限")
        res.send({
            status: 0,
            data: true,
            msg: '设置成功'
        })
    })
}

exports.deleteStorage = (req, res) => {
    const selectSql = `SELECT sum(total) total FROM inventory WHERE storageId = '${req.body.id}'`
    console.log(selectSql);
    db.query(selectSql, (err, result) => {
        if (result[0].total > 0) {
            res.send({
                status: 1,
                msg: '该用户存在入库产品，请处理后再删除'
            })
            return
        }
        let sql = `DELETE FROM storageData WHERE id = '${req.body.id}'`
        const data = req.body
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), "删除仓库")
            res.send({
                status: 0,
                data: true,
                msg: '删除成功'
            })
        })
    })
}