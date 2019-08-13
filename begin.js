const express=require("express");
const session = require("express-session");
const bodyParser=require("body-parser");
const userRouter=require("./routers/user.js");
const projectRouter=require("./routers/project.js");
//创建服务器
var server=express();
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//设置端口
server.listen(8080);
//托管静态资源到public下
server.use(express.static("public"));
//使用body-parser中间件，将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
	extended:false
}));
// /user/reg
server.use('/user',userRouter);
server.use('/project',projectRouter);
