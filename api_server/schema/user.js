// 导入验证该规则的包
const joi = require('joi')

/*
 * string() 值必须是字符串
 * alphanum() 值只能是 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * */


// 定义用户名和密码的验证规则
const username = joi.string().required()

const password = joi.string().required()

// 定义ID nickName email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// dataUrl() 指的是url格式字符串数据
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        // joi.ref('oldPwd') 表示newPwd的值必须和old的值保持一致
        // joi.not(joi.red('oldPwd)) 表示newPwd的值不能等于oldPwd的值
        // .concat() 用于合并 joi.not(joi.ref(''oldPwd)) 和 password 这两天验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 验证规则头像 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}