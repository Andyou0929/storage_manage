const db = require('../db/index')

exports.getLogData = (req, res) => {
    const data = req.body
    const sql = `SELECT logData.id,name,operation,phone,operationDate FROM logData,user WHERE name LIKE '%${data.name}%' AND operation LIKE '%${data.operation}%' AND user.id = logData.userId`
    console.log(sql);
    db.query(sql, (err, results) => {
        console.log(results);
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: results,
            msg: '设置成功'
        })
    })
}