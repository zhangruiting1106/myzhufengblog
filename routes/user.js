let express = require('express');
let router = express.Router();

// 用户注册，客户端访问为127.0.0.1:8080/user/signup
router.get('/signup', (req, res) => {  // 这里不再写 /user/signup ，直接写 /signup
    res.send('注册');
})

// 用户登录，客户端访问为127.0.0.1:8080/user/signin
router.get('/signin',(req,res) => {
    res.send('登录');
})

// 用户退出登录，客户端访问为127.0.0.1:8080/user/signout
router.get('/signout',(req,res) => {
    res.send('退出登录');
})


module.exports = router;