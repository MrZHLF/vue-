var express = require('express');
var router = express.Router();
const conn = require('./../db/db');
const svgCaptcha = require("svg-captcha");
const sms_util = require('./../util/sms_util');
const md5 = require('blueimp-md5');
let users = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//推荐
const recommendArr = require('./../data/recommend').data;
router.get('/recommend/api', function (req, res, next) {
    // 1. 定义临时数组
    let temp_arr_all = [];
    // 2. 遍历
    for (let i = 0; i < recommendArr.length; i++) {
        // 2.1 取出单个数据对象
        let oldItem = recommendArr[i];
        // 2.2 取出数据表中对应的字段
        let temp_arr = [];
        temp_arr.push(oldItem.goods_id);
        temp_arr.push(oldItem.goods_name);
        temp_arr.push(oldItem.short_name);
        temp_arr.push(oldItem.thumb_url);
        temp_arr.push(oldItem.hd_thumb_url);
        temp_arr.push(oldItem.image_url);
        temp_arr.push(oldItem.price);
        temp_arr.push(oldItem.normal_price);
        temp_arr.push(oldItem.market_price);
        temp_arr.push(oldItem.sales_tip);
        temp_arr.push(oldItem.hd_url);
        // 2.3 合并到大的数组
        temp_arr_all.push(temp_arr);
    }


    // 3. 批量插入数据库表
    // 3.1 数据库查询的语句
    let sqlStr = "INSERT INTO pdd_recommend(`goods_id`,`goods_name`,`short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`, `hd_url`) VALUES ?";
    // 3.2 执行语句
    conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {
        if (error) {
            console.log('插入失败');
        } else {
            console.log('插入成功');
        }
    });
});

/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
    /* const data = require('../data/homecasual');
    res.json({success_code: 200, message: data}) */
		//从数据库中查询数据
		let sqlStr = 'SELECT * FROM pdd_homecasual';
		conn.query(sqlStr,(err,results) => {
			if(err) {
				return res.json({err_code:1,message: '首页轮播不存在'})
			} else {
				res.json({success_code:200,message: results})
			}
		})
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
   /*
   let sqlStr = 'select * from homenav';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    const data = require('../data/homenav');
    res.json({success_code: 200, message: data});
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
    /*
   let sqlStr = 'select * from homeshoplist';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    setTimeout(function () {
         const data = require('../data/shopList');
         res.json({success_code: 200, message: data})
    }, 300);
});

/**
 * 获取推荐商品列表
 */
router.get('/api/recommendshoplist', (req, res)=>{

    // 1.0 获取参数
    let pageNo = req.query.page || 1;
    let pageSize = req.query.count || 20;
    //从数据库中查询数据
    let sqlStr = 'SELECT * FROM pdd_recommend LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
    conn.query(sqlStr, (err, results) => {
        if (err) {
            return res.json({ err_code: 1, message: '数据不存在' })
        } else {
            setTimeout(() => {
                res.json({ success_code: 200, message: results })
            }, 1000);
        }
    })

    // setTimeout(function () {
    //     const data = require('../data/recommend');
    //     res.json({success_code: 200, message: data})
    // }, 10);
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/recommend_users');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/search');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取一次性图形验证码
 */

router.get('/api/captcha', (req, res) => {
   let captcha = svgCaptcha.create({
     color: true,
     noise: 2,
     ignoreChars: "0o1i",
     size: 4
   });
   //保存
    req.session.captcha = captcha.text.toLocaleLowerCase();
    //返回客户端
    res.type('svg');
    res.send(captcha.data);
});

/* 
 获取短信验证码
*/
router.get('/api/send_code', (req, res) => {
   //获取手机验证码
   let phone = req.query.phone;
   //随机产生验证码
    let code = sms_util.randomCode(6);
    console.log(code)
    // .sms_util.sendCode(phone, code, function (success) {
    //     if(success) {
    //         users[phone] = code;
    //         res.json({success_code:200,message:code})
    //     } else {
    //         res.json({ err_code: 0, message: '验证码获取失败' })
    //     }
    // })
    //成功
    setTimeout(() => {
        users[phone] = code;
        res.json({ success_code: 200, message: code })
    }, 2000);
    //失败
   /*  setTimeout(() => {
        res.json({ err_code: 0, message: "验证码获取失败" });
    }, 2000); */
});


/*
登录验证 
 */
router.post('/api/login_code', (req, res) => {
    //1.获取数据
    const phone = req.body.phone;
    const code = req.body.code;

    //验证验证码是否正确
    if(users[phone] !== code){
        res.json({ err_code: 0, message: "验证码不正确" });
    }

    //查询数据库
    delete users[phone];
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_phone = '"+ phone +"' LIMIT 1";
    conn.query(sqlStr, (err, results) => {
      if (err) {
        return res.json({ err_code: 0, message: "数据不存在" });
      } else {
          console.log(results);
          results = JSON.parse(JSON.stringify(results));
          if(results[0]) { //用户已存在
            req.session.userId = results[0].id;
            //返回给客户端
            res.json({
              success_code: 200,
              message: {
                id: results[0].id,
                user_name: results[0].user_name,
                user_phone: results[0].user_phone,
              }
            });
          } else {
              //新用户
              const addSql = "INSERT INTO pdd_user_info(user_name,user_phone) VALUES (?,?)";
              const addSqlParams = [phone,phone];
              conn.query(addSql, addSqlParams,(error, results) => {
                  results = JSON.parse(JSON.stringify(results));
                //   console.log(results)
                if (!error) {
                    req.session.userId = results.insertId;
                    let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                    conn.query(sqlStr, (error, results) => {
                        if (error) {
                            return res.json({ err_code: 0, message: '数据不存在' })
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            //返回给客户端
                            res.json({
                                success_code: 200,
                                message: {
                                    id: results[0].id,
                                    user_name: results[0].user_name,
                                    user_phone: results[0].user_phone,
                                }
                            });
                        }
                    })
                }
            })
          }
      }
    });
});

/* 
	用户账号密码登录
 */
router.post('/api/login_pwt',(req,res) => {
	//获取数据
	let user_name = req.body.name;
	let user_pwd = md5(req.body.pwd);
	let captcha = req.body.captcha;
	console.log(user_name,user_pwd,captcha)
	
	// 2. 验证图形验证码是否正确
    if(captcha !== req.session.captcha){
        res.json({err_code: 0, message: '图形验证码不正确!'});
        return;
    }
    delete req.session.captcha;


    // 3. 查询数据
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_name = '" + user_name + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            if (results[0]) {  // 用户已经存在
                 // 验证密码是否正确
                 if(results[0].user_pwd !== user_pwd){
                     res.json({err_code: 0, message: '密码不正确!'});
                 }else {
                     req.session.userId = results[0].id;
                     // 返回数据给客户端
                     res.json({
                         success_code: 200,
                         message: {id: results[0].id, user_name: results[0].user_name, user_phone: results[0].user_phone},
                         info: '登录成功!'
                     });
                 }
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_pwd) VALUES (?, ?)";
                const addSqlParams = [user_name, user_pwd];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    // console.log(results);
                    if(!error){
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'});
                            } else {
                                results = JSON.parse(JSON.stringify(results));
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: {id: results[0].id, user_name: results[0].user_name, user_phone: results[0].user_phone}
                                });
                            }
                        });
                    }
                });
            }
        }
        console.log(req.session);
    });
})
/* 
*保存用户信息，根据session.userId存储到页面
 */

router.get('/api/user_info', (req, res) => {
    // 1.0 获取参数
    let userId = req.session.userId;
    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + userId + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ err_code: 0, message: '请求数据失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            if (!results[0]) {
                delete req.session.userId;
                res.json({ error_code: 1, message: '请先登录' });
            } else {
                // 返回数据给客户端
                res.json({
                    success_code: 200,
                    message: results[0]
                });
            }
        }
    });
});

/**
 * 退出登录
 */
router.get('/api/logout',(req,res) => {
    //删除用户id
    delete req.session.userId;
    // 用户提示
    res.json({
        success_code: 200,
        message: "退出登录成功"
    });
})


/**
 * 修改用户信息
 */
router.post('/api/user_update',(req,res) => {
    //获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    const user_sign = req.body.user_sign || '';
    //判断用户id是否存在
    if (!id){
        res.json({ err_code: 0, message: '用户不存在!' });
    }

    //插入sql数据库
    //  查询数据
    let sqlStr = "UPDATE pdd_user_info SET user_name = ?,user_sex = ?,user_address = ?,user_birthday = ?,user_sign = ? WHERE id ="+id;
    let strParams = [user_name, user_sex, user_address, user_birthday, user_sign];
    conn.query(sqlStr, strParams, (error, results, fields) => {
        if (error) {
            res.json({ err_code: 0, message: '修改用户失败!' });
        } else {
            res.json({ success_code: 200, message: "修改用户成功!" });
        }
    })
})

/**
 * 添加购物车
 */

 router.post('/api/add_shop_cart',(req,res) => {
     //判断用户是否存在
    let user_id = req.body.user_id;
     if(!user_id || user_id != req.session.userId) {
        res.json({ err_code: 0, message: "用户不合法!" });
        return
     }

     //获取数据
     let goods_id = req.body.goods_id;
     let goods_name = req.body.goods_name;
     let thumb_url = req.body.thumb_url;
     let price = req.body.price;
     let buy_count = 1;
     let is_pay = 0; // 0 未购买 1购买

     //查询数据库
     let sql_str = "SELECT * FROM lk_pdd_cart WHERE goods_id = '" + goods_id + "' LIMIT 1";
     conn.query(sql_str,(error, results, fields) => {
       if (error) {
         res.json({ err_code: 0, message: "服务器内部错误!" });
       } else {
           results = JSON.parse(JSON.stringify(results));
        //    console.log(results);
           if (results[0]) {   //商品存在
               console.log(results[0]);
               let buy_count = results[0].buy_count + 1;
               let sql_str = "UPDATE lk_pdd_cart SET buy_count = " + buy_count + " WHERE goods_id = '" + goods_id + "'";
               conn.query(sql_str, (error, results, fields) => {
                   if (error) {
                       res.json({ err_code: 0, message: '加入购物车失败!' });
                   } else {
                       res.json({ success_code: 200, message: '加入购物车成功!' });
                   }
               });
           } else {
               // 商品不存在
               let add_sql = "INSERT INTO lk_pdd_cart(goods_id,goods_name,thumb_url,price,buy_count,is_pay) VALUES (?,?,?,?,?,?);";
               let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay];
               conn.query(add_sql,sql_params,(error,results) => {
                    if (error) {
                       res.json({ err_code: 0, message: '加入购物车失败!' });
                    } else {
                       res.json({ success_code: 200, message: '加入购物车成功!' });
                    }
               })
           }
       }
     });
 })


/**
 * 查询购物车数据
 */
router.get('/api/cart_goods', (req, res) => {
    // 1.0 获取参数
    if (!req.session.userId) {
        res.json({ err_code: 0, message: '请先登录!' });
        return;
    }

    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM lk_pdd_cart";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ err_code: 0, message: '请求数据失败' });
        } else {
            // 返回数据给客户端
            res.json({ success_code: 200, message: results });
        }
    });
});

/**
 * 删除单个数据库中的商品
 */

router.delete('/api/dele_shoping',(req,res) => {
	let goods_id = req.body.goods_id;
	// 1.1 数据库查询的语句
	let sqlStr = "DELETE FROM lk_pdd_cart WHERE goods_id = '"+goods_id+"'";
	conn.query(sqlStr, (error, results, fields) => {
			if (error) {
					res.json({ err_code: 0, message: '商品删除失败' });
			} else {
					// 返回数据给客户端
					res.json({ success_code: 200, message: results });
			}
	});
})

/**
 * 获取商品数据
 */
router.get('/api/getqalist', (req, res) => {
	const course = req.query.course;
	const limit = req.query.limit || 20;
	const keyword = req.query.keyword || '';

	let sqlStr = 'select * from qa where course= "' + course + '" LIMIT ' + limit;
	if (keyword !== '') {
			sqlStr = 'select * from qa where course= "' + course + '" AND qname LIKE "%' + keyword + '%" LIMIT ' + limit;
	}

	conn.query(sqlStr, (err, results) => {
			if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0});
			res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
	})
});
router.get('/public/images/home/*', function (req, res) {
    res.sendFile( req.url );
    console.log(req.url);
    console.log(__dirname);
});

module.exports = router;
