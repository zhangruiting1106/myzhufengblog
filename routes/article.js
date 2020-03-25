let express = require('express');
let { checkLogin, checkNotLogin } = require('../auth');	
let router = express.Router();

// 用户发表文章，客户端访问为127.0.0.1:8080/article/add
router.get('/add',checkLogin,(req,res) => {
    // res.send('发表文章');
    res.render('article/add', { title: '发表文章' });
})

module.exports = router;
