# stronge_manage

#### 介绍
仓储管理系统

#### 软件架构
nodejs,vue
 

#### 安装教程

#####数据库部署

1.执行createTable.sql的所有语句

2.修改/api_serve/db/index.js的文件

```
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'your username',
    password: 'your password',
    database: 'storage_manage'
})

module.exports = db
```

#####后端服务启动方法
1.  nodejs版本 >= 16.0.0
2.  后台服务启动 
    `node app.js`

#####前端服务启动方法
1.  安装依赖
    `yarn install`
2.  启动项目
     `yarn run serve`
3.  打包项目
    `yarn run build`
