let express = require('express');
let router = express.Router();

// 用户发表文章，客户端访问为127.0.0.1:8080/article/add
router.get('/add',(req,res) => {
    res.send('发表文章');
})

module.exports = router;
