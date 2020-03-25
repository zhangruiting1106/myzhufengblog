// 针对登录后不再访问的路由，定义一个中间件：检测当前用户是否登录，如果登录了(能获取到session中的信息)，当用户输入网址127.0.0.1:8080/user/signin时，让其跳转到首页
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        res.redirect('/');
    }else{
        next();
    }
}

// 针对只有登录后才能访问的路由，定义一个中间件：检测当前用户是否登录，如果没登录，跳转到登录页
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/signin');
    }
}