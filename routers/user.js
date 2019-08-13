const express=require("express");
const pool=require("../pool.js");
const session = require("express-session");
var router=express.Router();
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//用户注册路由
router.get('/reg',(req,res)=>{
	var obj=req.query();
	for(var key in obj){
		if(!obj[key]){
			res.send(obj[key]+"不能为空");
		}
		return;
	}
	var sql="insert into beauty set ?";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send(result);
		}
	});
	
});
//用户登录路由
router.post('/login',(req,res)=>{
	var frm=req.body.frm;
	var $uname=req.body.username;
	var $upwd=req.body.userpwd;
	if(!$uname){
		res.send("接收不到用户名");
		return;
	}
	if(!$upwd){
		res.send("接收不到密码");
		return;
	}
	var sql="select * from beauty_user where username=? and userpwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0){
			req.session.userid=result[0].uid;
			console.log(req.session.userid);
			if(frm){
				res.redirect(frm);
			}else{
			res.redirect("/index.html");
		}
		}else{
			res.redirect("/login.html?error=1");
		}
	});
});

//首页产品
router.post('/firstproduct',(req,res)=>{
	var $type=req.body.type;
	var $pagesize=req.body.pagesize;

	var sql="select * from beauty_product where c_type=? limit 0,"+$pagesize;
	pool.query(sql,[$type],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});

router.post('/decoration',(req,res)=>{
	var d_order=req.body.d_order;
	var $type=req.body.d_type;
	var $page=req.body.page;
	var $order_info="pr_id desc";
		if(d_order==1){ //排序价格从低到高
			$order_info="d_price asc";
		}else if(d_order == 2){
			$order_info="d_price desc";
		}else if(d_order==3){
			$order_info="priciew desc";
		}
		console.log(d_order+":");
		console.log($order_info);
		var type_sql="";
		if($type){
			type_sql=" and c_type="+$type;
		}

	var sql="select * from beauty_product where 1=1"+type_sql+" order by "+$order_info+" limit ?,20";

	pool.query(sql,[($page-1)*20],(err,result)=>{
	
		if(err)throw err;
		res.send(result);
	});
});

router.post('/details',(req,res)=>{
	var prid=req.body.id;
	var sql="select pr_id,title,subtitle,details,d_price from beauty_product where pr_id=?";
	pool.query(sql,[prid],(err,result)=>{	
		if(err)throw err;
		res.send(result);
	});
});
router.post('/refmsg',(req,res)=>{
	var prid=req.body.id;
	var sql="select a.p_img,a.s_content,a.s_time,a.aid,b.username,b.user_head from beayty_appraise a left join beauty_user b on a.uid=b.uid where pid=?";
	pool.query(sql,[prid],(err,result)=>{	
		if(err)throw err;
		res.send(result);
	});
});

router.post('/tuijian',(req,res)=>{
	var prid=req.body.id;
	var page=req.body.page;
	
	page=page==undefined?5:page;
    var sql ="select pr_id,title,d_price,priciew,imgurl from beauty_product where is_tj=1 and c_type=(select c_type from beauty_product where pr_id=?) limit 0,?";
	pool.query(sql,[prid,page],(err,result)=>{	
		if(err)throw err;
		res.send(result);
	});
});

router.post("/love", (req, res) => {
    var $prid = req.body.id;
    var sql = "select pr_id,title,d_price,priciew,imgurl from beauty_product where c_type=(select c_type from beauty_product where pr_id=?) limit 0,?";
    pool.query(sql, [$prid, 10], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post("/imglist", (req, res) => {
    var $prid = req.body.id;
    var sql = "select imgurl,id,isdefault,pcount from beauty_product_imgs where pid=? order by isdefault desc limit 0,5";
    pool.query(sql, [$prid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//导出路由器对象
module.exports=router;