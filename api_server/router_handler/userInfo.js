// 导入数据库操作模块
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const cofy = require('../config')
    // 导入处理密码的mok
const bcryptjs = require('bcryptjs')
const result = { "id": "4291d7da9005377ec9aec4a71ea837f", "name": "天野远子", "username": "admin", "password": "", "avatar": "/avatar2.jpg", "status": 1, "telephone": "", "lastLoginIp": "27.154.74.117", "lastLoginTime": 1534837621348, "creatorId": "admin", "createTime": 1497160610259, "merchantCode": "TLif2btpzg079h15bk", "deleted": 0, "roleId": "admin", "role": { "id": "admin", "name": "管理员", "describe": "拥有所有权限", "status": 1, "creatorId": "system", "createTime": 1497160610259, "deleted": 0, "permissions": [{ "roleId": "admin", "permissionId": "dashboard", "permissionName": "仪表盘", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "exception", "permissionName": "异常页面权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "result", "permissionName": "结果权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "profile", "permissionName": "详细页权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "table", "permissionName": "表格权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "import", "describe": "导入", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "form", "permissionName": "表单权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "order", "permissionName": "订单管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "permission", "permissionName": "权限管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "role", "permissionName": "角色管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "table", "permissionName": "桌子管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "user", "permissionName": "用户管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"},{\"action\":\"export\",\"defaultCheck\":false,\"describe\":\"导出\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "import", "describe": "导入", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }, { "action": "export", "describe": "导出", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "support", "permissionName": "超级模块", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"},{\"action\":\"export\",\"defaultCheck\":false,\"describe\":\"导出\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "import", "describe": "导入", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }, { "action": "export", "describe": "导出", "defaultCheck": false }], "actionList": null, "dataAccess": null }] } }

exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的SQL语句
    console.log(req.headers["access-token"]);
    jwt.verify(req.headers["access-token"].replace("Bearer ", ""), cofy.jwtSecretKey, (err, decoded) => {
        if (err) {
            // 解密失败，可能是token无效或已过期
            console.error('JWT verification failed:', err);
        } else {
            // 解密成功，decoded中包含了原始的用户信息
            console.log('Decoded user information:', decoded);
            const sqlStr = 'SELECT * FROM user WHERE id=?'
                // 调用db.query执行sql语句
            db.query(sqlStr, decoded.id, (err, results) => {
                // 执行SQL语句失败
                if (err) return res.cc(err)
                    // 执行SQL语句成功 但是查询的结果不能为空
                if (results.length !== 1) return res.cc('获取用户信息失败')

                // 用户信息获取成功
                res.send({
                    status: 0,
                    message: '获取用户信息成功',
                    data: {...result, ...results[0] }
                })
            })
        }

    });

}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    // 定义执行的sql语句
    const sqlStr = 'UPDATE ev_users SET ? WHERE id = ?'
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)

        // 执行sql语句成功但影响行数不为1
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败')

        return res.cc('修改用户信息成功', 0)
    })
}

// 修改密码的处理函数
exports.updatePassword = (req, res) => {
    // 根据id 查询用户的信息
    const sql = 'SELECT * FROM ev_users WHERE id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')

        // 判断密码是否正确
        const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')
            // 更新数据库中的密码
        const sqlStr = 'UPDATE ev_users SET password = ? WHERE id = ?'
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

// 更新用户头像的路由
exports.updateAvatar = (req, res) => {
    // 定义更新头像的sql语句
    const sql = 'UPDATE ev_user SET user_pic=? WHERE id=?'
        // 执行更新头像的sql语句
    db.quert(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}