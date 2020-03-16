let express = require('express');
let path = require('path');
let app = express();

// 设置模板引擎
app.set('view engine','html');  // 设置所有模板文件的后缀都为html
app.set('views',path.resolve('views'));  // 设置模板的存放根目录，是个绝对路径
app.engine('html',require('ejs').__express);  // 指定把html类型的模板用ejs方法进行渲染

// 指定静态资源文件根目录：放的是css,js,font,img等文件，这里没放html文件是因为html文件都是用模板渲染的，并不是真的静态资源文件
app.use(express.static(path.resolve('node_modules')));

// 路由中间件分发处理
app.use('/', require('./routes/index')); // 客户端访问127.0.0.1:8080或127.0.0.1:8080/时，走这个路由管控，进入index.js中查找具体路由
app.use('/user',require('./routes/user'));  // 当客户端请求路径是以 /user 开头时，走这个路由管控，进入user.js中查找具体路由。如果请求路径为/users/xxx , /user1/xxx这种，都不能匹配上，必须/user/xxx才可以
app.use('/article',require('./routes/article'));



app.listen(8080,()=>{
    console.log('SUCCESS!');
});