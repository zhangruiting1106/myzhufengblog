let express = require('express');
let router = express.Router();

router.get('/',(req,res) => {
    res.send('首页');
})


module.exports = router;