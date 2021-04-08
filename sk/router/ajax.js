const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();

//原生http的get方法登录
//http://127.0.0.1:8080/ajax/http_login?uname=abc&upwd=123
r.get("/http_login",(req,res)=>{
	var _uname=req.query.uname;
	var _upwd=req.query.upwd;
	//res.send("用户名:"+_uname+",密码:"+_upwd);
	//操作数据库了
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");//必须是字符串或者对象
		}else{
			res.send("0");
		}
	});
});
//原生http的get方法的登录
//127.0.0.1:8080/ajax/v1/http_get?uname=abc&upwd=123
r.get("/v1/http_get",(req,res)=>{
	var _uname=req.query.uname;
	var _upwd=req.query.upwd;
	var sql="select * from sk_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
	
});

//restful的get登录
r.get("/v1/restful_get/:uname&:upwd",(req,res)=>{
	var _uname=req.params.uname;
	var _upwd=req.params.upwd;
	var sql="select * from sk_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//delete方法删除,不能再地址栏验证
r.delete("/restful_del/:uid",(req,res)=>{
	var _uid=req.params.uid;
	var sql="delete from sk_user where uid=?";
	pool.query(sql,[_uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//获取所有用户信息
r.get("/userlist",(req,res)=>{
	var sql="select * from sk_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		//console.log(typeof(result));
		//console.log(result);
		res.send(result);
	});
});
//post登录------项目中post用于insert模块
r.put("/post_login",(req,res)=>{
	var _uname=req.body.uname;
	var _upwd=req.body.upwd;
	console.log(_uname,_upwd);
	var sql="select * from sk_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//导出路由器对象
module.exports=r;