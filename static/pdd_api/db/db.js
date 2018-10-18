const mysql = require('mysql');
const conn =  mysql.createConnection({
	host: 'localhost',  //数据库地址
	user: 'root',   // 账号
	password: 'root', //密码
	database: 'lk_pdd', //数据库名称
});
conn.connect();
module.exports = conn