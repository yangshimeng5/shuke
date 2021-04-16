// 引入express模块
const express=require('express');
const r=express.Router();
// 引入链接池模块
const pool=require('../pool.js');


// 使用post的方法获得注册数据
r.post('/reg',(req,res,next)=>{
    // 获取流的数据
    let obj=req.body;
    console.log(obj);
    // 1.1验证各项数据是否为空
    let n=400; //错误代码、
    for(let k in obj){
        n++;//遍历数组，检测数组是否为空，如果是错误编码为n
        if(!obj[k]){
            res.send({code:n ,msg:"不能为空"});
            return;
        }
    }
    // 检测电号码是否为正确的格式
    let reg=/^1[3-9]\d{9}$/;
    let ph=reg.test(obj.phone);
    if(!ph){
        res.send({code:201,msg:"电话格式有误"});
        return;
    }
    // 执行SQL命令
    pool.query('insert into sk_user set ?',[obj],(err,result)=>{
        if(err){
            next(err);
            return;
        };
        console.log(result);
        res.send({code:200,msg:'注册成功'});
    })
})


//添加用户登录的路由,(post /login),获取用户名和密码(以流的方式传递),判断是否为空,执行SQL命令,到数据库中查询是否有用户名和密码匹配的数据,如果查询到 登录成功,否则为时报
//select * from xz_user where uname=? and upwd=?
r.post('/login',(req,res,next)=>{
    let obj=req.body;
    console.log(obj);
    // 验证数据是否为空
    if(!obj.uname){
        res.send({code:301,msg:'用户名不能为空'});
        return;
    }else if(!obj.upwd){
        res.send({code:302,msg:'密码不能为空'});
        return;
    }
    // 执行SQL代码
    pool.query('select * from sk_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,res,next)=>{
        if(err){
            next(err);
            return;
        }
        console.log(result);
        if(result.length===0){
            res.send({code:300,msg:"你输入的密码错误"})
        }else{
            res.send({code:300,msg:"登录成功"})
        }
    })
});
// 修改用户信息
r.put("/update",(req,res)=>{
    let obj=req.body;
     console.log(obj);
    for(let k in obj){
        k++;//遍历数组，检测数组是否为空，如果是错误编码为n
        if(!obj[k]){
            res.send({code:200 ,msg:k+"不能为空"});
            return;
        }
    }
    // 检测电号码是否为正确的格式
    let reg=/^1[3-9]\d{9}$/;
    let ph=reg.test(obj.phone);
    if(!ph){
        res.send({code:201,msg:"电话格式有误"});
        return;
    }
    pool.query("update sk_user set ? where uid=?;",[obj,obj.uid],(err,result)=>{
        console.log(result)
        if(err){
            next(err);
            return;
        }; 
        res.send({code:200,msg:'修改成功'});
    })

})
module.exports=r