let express = require('express');
let router = express.Router();

// 客户端请求127.0.0.1:8080/index.html
router.get('/',(req,res) => {
    // res.send('首页');  // 为了跑通路由做的测试
    // 实际要返回的是index.html页面，需要用模板渲染
    res.render('index',{title:'首页'});  // 渲染时的路径是相对于模板根目录views的相对路径，可以不写后缀
})


module.exports = router;