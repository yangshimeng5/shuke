const express=require('express');
const shop=express.Router();
//引入连接池模块
const pool=require('../pool.js')


//练习:添加商品列表的路由(get /),传递页码和每页的数据量,判断页码和每页的数据量是否为空,如果页码为空默认第一页,如果每页数据量为空默认显示五个用户,最后响应查询到的用户
//5.商品列表(get  /)
shop.get('/',(req,res,next)=>{
	let obj=req.query;
	console.log(obj)
	// 判断是否为空
	if(!obj.pno)	obj.pno=1;
	if(!obj.count) obj.count=5;
	//计算开始查询的值
	let start=(obj.pno-1)*obj.count;
	//将每页数据量转为整型
	let size=parseInt(obj.count);
	//执行SQL命令
	pool.query('select * from sk_laptop limit ?,?',[start,size],(err,result)=>{
	if (err){
		next(err);
		return;
	}
	console.log(result);
	res.send({code:200,msg:'查询成功',msg:'查询成功',data:result})
	})
})

module.exports=shop;