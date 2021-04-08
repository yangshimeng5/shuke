// 引入MySQL模块
const mysql=require('mysql');
// 创建链接池对象
const pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'suke',
    connectionLimit:20
});
// 导出模块
module.exports=pool;