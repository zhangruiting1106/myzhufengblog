let mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://127.0.0.1/zhufengblog',{useNewUrlParser:true,useUnifiedTopology:true});  // 连接数据库，没有的话自动创建，端口不写则走默认的27017
conn.on('error',error=>{
    console.log('失败'+error);
})
conn.on('open',_=>{
    console.log('成功');
})

// 定义用户集合的骨架模型，规定其文档的属性和类型：如果传的值不是这三个属性的，不保存
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
})
// 定义用户模型，挂载到导出对象上

let User = conn.model('User', UserSchema);
module.exports.User = User;

// let User = mongoose.model('User',UserSchema);
// module.exports.User = User;