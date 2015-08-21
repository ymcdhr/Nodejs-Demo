var CommonData = require('./CommonData.js');


/*
 * 数据库操作函数
 * */
exports.dbFuncs = function (conn) {
    //添加商店
    //addShop(conn, "cckkShop");

    //添加用户
    addUser(conn, "ymcdhr", "阳光绵羊", 1, 2);
};


/*
 * 添加用户
 * */
function addUser(conn, userId, userName, isManager, shopId) {
    
    var sqlStr = "INSERT INTO `users` (`userId`, `name`, `isManager`, `shopId`) VALUES ('"+ userId+"', '"+userName+"', '"+ isManager+"', '"+ shopId+"')";
    
    //执行的数据库查询语句
    conn.query(sqlStr);
    conn.query('USE ' + CommonData.Database);
}


/*
 * 添加商店
 * */
function addShop(conn, name) {
    
    var sqlStr = "INSERT INTO `shop` (name) VALUES ('" + name + "')";
    
    //执行的数据库查询语句
    conn.query(sqlStr);
    conn.query('USE ' + CommonData.Database);
}


/*
 * 添加大类
 * */
exports.addBigClass = function (conn, userId, addData) {
    
    //先根据userId查询出shopId

    var addData = {

    };
    
    
    //执行的数据库查询语句
    conn.query();
};


