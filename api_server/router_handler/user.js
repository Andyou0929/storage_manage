const db = require('../db/index')
const bcryptjs = require('bcryptjs')
    // 导入生成Token的包
const jwt = require('jsonwebtoken')
const cofy = require('../config')
const { insert } = require("../utils/insertLogoData")
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
        // 对表单中的数据，进行合法校验
        /*if (!userInfo.username || !userInfo.password){
            /!*return res.send({
                status:1,
                message:'用户名或密码不能为空!'
            })*!/
            return res.cc('用户名或密码不能为空!')
        }*/
        // 定义sql语句，查询用户名是否被占用
    const sqlStr = 'SELECT * FROM ev_users WHERE username = ?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            /*return res.send({
                status:1,
                message:err.message
            })*/
            return res.cc(err)
        }
        if (results.length > 0) {
            /*return  res.send({
                status:1,
                message:'用户名以被占用'
            })*/
            return res.cc('用户名以被占用')
        }
        // 调用bcryptjs.hashSync() 对密码进行加密
        userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

        // 定义插入新用户的SQL语句
        const sql = 'INSERT INTO ev_users SET ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            // 判断 sql 语句是否执行成功
            if (err) return res.cc(err)
                /*return res.send({
            status:1,
            message:err.message
        })*/

            if (results.affectedRows !== 1) return res.cc(err)
                /*res.send({
                    status:1,
                    message:err.message
                })*/
                // 注册用户成功
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })
}

exports.login = (req, res) => {
    // 接收表单的数据
    const userInfo = req.body
        // 定义SQL语句
    const sql = 'SELECT * FROM user WHERE name = ?'
        // 执行SQL语句,根据用户名查询用户的信息
    db.query(sql, userInfo.username, (err, results) => {
            // 执行SQL语句失败
            if (err) return res.cc(err)

            // 执行SQL语句成功
            if (results.length !== 1) return res.cc('登陆失败,账号错误')
            console.log(results[0], 'results');
            if (userInfo.password !== results[0].password) {
                return res.cc('登陆失败,密码错误')
            }
            // 在服务端生成Token的字符串
            const user = {...results[0], password: '', user_pic: '' }
                // 对用户的信息进行加密，生成Token 字符串
            const token = jwt.sign(user, cofy.jwtSecretKey, { expiresIn: cofy.expiresIn })
                // 调用res.send()方法，返回数据给客户端
            let obj = {
                status: 0,
                message: '登陆成功',
                token: 'Bearer ' + token,
                ...results[0]
            }
            delete obj.password
            res.send(obj)
        })
        // res.send('login OK')
}

// 获取用户列表
exports.getUserList = (req, res) => {
    let sql = "SELECT id,name,phone,power FROM user"
    console.log(req.body);
    const data = req.body
    if (data.name !== "" || data.phone !== "" || data.power !== "undefined") {
        sql += " WHERE"
        for (const key in data) {
            if (data[key] != "" && data[key] !== "undefined") {
                console.log(key);
                sql += ` ${key} LIKE '%${data[key]}%' AND`
            }
        }
        sql += " true"
    }
    console.log(sql);
    db.query(sql, (err, results) => {
        res.send({
            status: 0,
            data: results,
            msg: '获取列表数据成功'
        })
    })
}

// 新增用户
exports.addUser = (req, res) => {
    console.log(req.body);
    let selectSql = "SELECT * FROM user where name=?"
    let insertSql = `INSERT INTO logData VALUES()`

    db.query(selectSql, req.body.name, (err, result) => {
        if (result.length === 1) {
            res.send({
                status: 1,
                msg: '用户名已被占用，请更换'
            })
            return
        }
        let sql = "INSERT INTO user SET ?"
        const data = req.body
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), "新增")
            res.send({
                status: 0,
                data: true,
                msg: '添加成功'
            })
        })
    })

}

// 设置用户权限
exports.updatePower = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `UPDATE user set power = ${data.power == 0 ? 1 : 0} WHERE id = "${data.id}"`
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

// 删除用户
exports.deleteUser = (req, res) => {
    const selectSql = `SELECT * FROM in_storage WHERE userId = '${req.body.id}'`
    console.log(selectSql);
    db.query(selectSql, (err, result) => {
        console.log(result);
        if (result.length) {
            res.send({
                status: 1,
                msg: '该用户存在入库产品，请处理后再删除'
            })
            return
        }
        let sql = `DELETE FROM user WHERE id = '${req.body.id}'`
        const data = req.body
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
            insert(req.headers["access-token"].replace("Bearer ", ""), "删除用户")
            res.send({
                status: 0,
                data: true,
                msg: '删除成功'
            })
        })
    })
}

// 修改用户信息
exports.updateUser = (req, res) => {
    const data = req.body
    console.log(data);
    let sql = `UPDATE user set phone = ${data.phone} WHERE id = "${data.id}"`
    console.log(sql);
    db.query(sql, data, (err, results) => {
        if (err) return res.cc(err)
        insert(req.headers["access-token"].replace("Bearer ", ""), "设置用户信息")
        res.send({
            status: 0,
            data: true,
            msg: '设置成功'
        })
    })
}

exports.getCount = (req, res) => {
    const sql = `SELECT
    'storagedata' AS storagedata,
    COUNT(*) AS row_count
FROM
    storagedata
UNION ALL
SELECT
    'goods' AS goods,
    COUNT(*) AS row_count
FROM
    goods
UNION ALL
SELECT
    'provider' AS provider,
    COUNT(*) AS row_count
FROM
    provider
UNION ALL
SELECT
    'customer' AS customer,
    COUNT(*) AS row_count
FROM
    customer;`
    db.query(sql, (err, result) => {
        console.log(result);
        let obj = {}
        result.forEach(item => {
            obj[item.storagedata] = item.row_count
        })
        res.send({
            status: 1,
            data: obj
        })
    })
}