let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');  // 消息提示中间件，使用时必须放在session中间件后面

let app = express();

// 设置模板引擎
app.set('view engine','html');  // 设置所有模板文件的后缀都为html
app.set('views',path.resolve('views'));  // 设置模板的存放根目录，是个绝对路径
app.engine('html',require('ejs').__express);  // 指定把html类型的模板用ejs方法进行渲染

// 获取请求体中的内容：form表单使用的是urlencoded格式
app.use(bodyParser.urlencoded({
    extended:true
}));

// 使用session中间件，其中的resave,secret,saveUninitialized三个属性是必须设置的
// 该中间件使用后，在req上就有了session属性，默认是空对象 -- req.session会话对象，可以向里面写入信息或者获取信息
app.use(session({
    resave:true,  // 表示每次客户端请求到服务器都会保存session
    secret:'zfpx',  // 用于加密cookie，防止客户端篡改cookie
    saveUninitialized:true  // 保存未初始化的session
}));

// 使用flash中间件，会在req上有flash属性，可以赋值，也可以取值，req.flash(type,msg) / req.flash(type)
app.use(flash());

// 使用中间件
app.use((req,res,next) => {
    res.locals.user = req.session.user;  // 把req.session.user获取到
    // 分别给res.locals对象上添加success,error属性，值分别为req.flash成功和失败数组中的内容，需要转成字符串类型
    res.locals.success = req.flash('success').toString();  
    res.locals.error = req.flash('error').toString();
    next();
})        

// 指定静态资源文件根目录：放的是css,js,font,img等文件，这里没放html文件是因为html文件都是用模板渲染的，并不是真的静态资源文件
app.use(express.static(path.resolve('node_modules')));

// 路由中间件分发处理
app.use('/', require('./routes/index')); // 客户端访问127.0.0.1:8080或127.0.0.1:8080/时，走这个路由管控，进入index.js中查找具体路由
app.use('/user',require('./routes/user'));  // 当客户端请求路径是以 /user 开头时，走这个路由管控，进入user.js中查找具体路由。如果请求路径为/users/xxx , /user1/xxx这种，都不能匹配上，必须/user/xxx才可以
app.use('/article',require('./routes/article'));



app.listen(8080,()=>{
    console.log('SUCCESS!');
});