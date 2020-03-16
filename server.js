let express = require('express');


let app = express();

// 路由中间件分发处理
app.use('/', require('./routes/index')); // 客户端访问127.0.0.1:8080或127.0.0.1:8080/时，走这个路由管控，进入index.js中查找具体路由
app.use('/user',require('./routes/user'));  // 当客户端请求路径是以 /user 开头时，走这个路由管控，进入user.js中查找具体路由。如果请求路径为/users/xxx , /user1/xxx这种，都不能匹配上，必须/user/xxx才可以
app.use('/article',require('./routes/article'));



app.listen(8080,()=>{
    console.log('SUCCESS!');
});