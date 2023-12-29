const jwt = require('jsonwebtoken')
const cofy = require('../config')
const db = require('../db/index')
exports.insert = (token, operation) => {
    console.log(token, operation);
    let obj = {
        id: "ld" + new Date().getTime(),
        userId: "",
        operation,
        operationDate: getCurrentDateTime()
    }
    getUserId(token).then(res => {
        obj.userId = res
        let sql = "INSERT INTO logData SET ?";
        db.query(sql, obj, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("日志添加成功");
            }
        })
    })

}

const getCurrentDateTime = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

const getUserId = (token) => {
    return new Promise((resolev, reject) => {
        jwt.verify(token, cofy.jwtSecretKey, (err, decoded) => {
            if (err) {
                // 解密失败，可能是token无效或已过期
                console.error('JWT verification failed:', err);
            } else {
                // 解密成功，decoded中包含了原始的用户信息
                console.log('Decoded user information:', decoded);
            }
            resolev(decoded.id)
        })
    })
}