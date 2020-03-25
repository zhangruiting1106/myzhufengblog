let express = require('express');
let model = require('../model');
let {checkLogin,checkNotLogin} = require('../auth');	
let router = express.Router();

// 用户注册，客户端访问为127.0.0.1:8080/user/signup，即注册页面
router.get('/signup', checkNotLogin,(req, res) => {  // 这里不再写 /user/signup ，直接写 /signup
    // res.send('注册');
    res.render('user/signup', { title: '注册' });
})

// 用户注册，把注册信息放在请求体中给服务器
router.post('/signup',checkNotLogin,(req,res) => {
    // 通过中间件body-parser拿到请求体中的内容，放在了req.body上
    let user = req.body;  // 请求体对象中有username,password,email
    // 把数据放到数据库
    model.User.create(user,(err,doc) => {  // doc是保存成功后的user对象，会自动添加两个属性 _id __v
        if(err){
            req.flash('error','用户注册失败');
            res.redirect('back');
        }else{
            req.flash('success','用户注册成功');
            res.redirect('/user/signin');
        }
    })
})


// 用户登录，客户端访问为127.0.0.1:8080/user/signin，即登录页面
router.get('/signin',checkNotLogin,(req,res) => {
    // res.send('登录');
    res.render('user/signin', { title: '登录' });
})

// 用户登录，输入用户名密码后提交
router.post('/signin',checkNotLogin,(req,res) => {
    let user = req.body;
    // 到数据库中查找是否有匹配的用户
    model.User.findOne(user,(err,doc) => {
        if(err){  // 查询数据库失败
            req.flash('error', '操作数据库失败');
            res.redirect('back');  // 跳转回当前页
        }else{  // 查询数据库成功
            if(doc){  // 取到了匹配信息
                req.flash('success', '用户登录成功');
                req.session.user = doc;  // 向会话对象中写入属性user，让值为当前查询到的用户信息
                res.redirect('/');  // 登录成功，跳转到首页
            }else{  // 没取到匹配信息
                req.flash('error', '用户名或密码不正确');
                res.redirect('back');
            }
        }
    });
})

// 用户退出登录，客户端访问为127.0.0.1:8080/user/signout
router.get('/signout',checkLogin,(req,res) => {
    // res.send('退出登录');
    req.flash('success', '用户退出成功');
    req.session.user = null;  // 清空session中当前用户的信息
    res.redirect('/user/signin');  // 退出登录，重新回到登录页
})


module.exports = router;