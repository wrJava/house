const express=require("express");
const session = require("express-session");
const pool = require("../pool.js");
var router = express.Router();
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//购物车列表
router.post('/cardlist', (req, res) => {
    //设置session
    
    var $uid=req.session.userid;
    if ($uid == undefined) {
        res.send("-1");
        return;
    }
	var sql="select a.count,a.amount,a.createtime,b.title,b.d_price,b.imgurl from beauty_shopping a left join beauty_product b on a.pid=b.pr_id where userid=? and a.status=0 limit 0,100";
	pool.query(sql,[$uid],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});

//购物车删除
router.post('/carddel', (req, res) => {
    var $uid = req.session.userid;
    var $prid = req.body.prid;
    if ($uid == undefined) {
        res.send("-1");
        return;
    }
    var sql = "update beauty_shopping set status=1 where uid=? and pid=?";
    pool.query(sql, [$uid,$prid], (err, result) => {
        if (err) throw err;
      
        res.send(result);
    });
});

//加入购物车
router.post('/addcard',(req,res)=>{
    var $prid=req.body.prid;
    var $uid = req.session.userid;
    var $num=req.session.num;
    if ($uid == undefined) {
        res.send("-1");
        return;
    }
    var $amount=req.body.amount;
	var sql="insert into beauty_shopping VALUES(default,?,?,?,?,now(),0);";
    pool.query(sql, [$uid, $prid,$num, $amount], (err, result) => {
        if (err) {
            console.log(err);
            return;
        };
		res.send(result);
	});
});

//生成订单
router.post('/addorder', (req, res) => {
    var $uid=req.body.uid;
    var $amount = req.body.amount;
    var $productlist = req.body.plist;
    var $address = req.body.address;
    var $phone = req.body.phone;
    var attrlist = JSON.parse($productlist);
     var sql = "insert into beauty_order values(default,?,?,?,now(),0,0,?,?,'',0)";
     pool.query(sql, [$uid, $amount, $amount, $address, $phone], (err, result) => {
         if (err) {            
             res.send("0");
             return;
         }
         var oid = result.insertId;
         for (item of attrlist) {
             pool.query("insert into beauty_order_class values(default,?,?,'',?,now())", [item['prid'], oid, item['count']], (err1, result1) => {
                 if (err1) {                           
                     res.send("0");
                    
                 }
             })
         }
         res.send("0");
     });
   
});


//导出路由器对象
module.exports=router;