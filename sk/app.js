// 加载express模块
const express=require('express');
// 启用服务器
const app=express();
// 创建端口
app.listen(8080);
// 引入body-parer
const bodyParser=require('body-parser');
// 加载路由器Router
const userRouter=require('./router/user.js');
const shopRouter=require('./router/shopping.js');
// 托管静态页面
app.use(express.static('./public'));
//应用body-parser中间件将流的方式请求的数据解析为对象
app.use(bodyParser.urlencoded({
    extended:false
}));
// 错误处理中间件
// 要拦截的产生的错误
app.use((err,req,res,next)=>{
    // err接收的错误
    console.log(err);
    res.send({code:500,msg:"服务器端错误"});
});

// 应用路由器的，添加前缀
//将哟户的路由挂载到web服务器下同时添加前缀/user
app.use('/v1/users',userRouter);
app.use('/v1/shop',shopRouter);