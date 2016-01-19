var COM = require('./CommonData.js');


/*
 * 添加用户
 */
 exports.addUser = function (conn, req, res) {
    var data = req.body;
    var userName = data.userName, 
        passWord  = data.passWord ,
        name = data.name,
        isManager = data.isManager;

    var sqlStr = "INSERT INTO `users` (`userName`, `name`, `isManager`, `passWord`) VALUES ('" + userName + "', '" + name + "'," + isManager  + ", '" + passWord + "')";
    conn.query(sqlStr).then(function (rows) {
        
        console.log("insert ok:", rows);

        var sendObj = { "errcode": "0", "errmsg": rows };
        res.send(200, sendObj);

    }, function (err) {
        console.log(sqlStr);
        console.log("insert err:", err);
        console.log("insert err:", err.sqlState);

        if (err.sqlState == 42000) {
            var sendObj = { "errcode": "20004", "errmsg": "用户名重复!" };
            res.send(200, sendObj);
        }
        else {
            var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
            res.send(200, sendObj);
        }
    });
};

/**
 * 修改用户名密码
 */
exports.modifyUserPwd = function (conn, req, res) {
    var data = req.body;

    var userName = data.userName,
        oldPassWord = data.oldPassWord,
        newPassWord = data.newPassWord;

    //先查询看用户名密码是否正确
    var selectUser = "SELECT * FROM account.users where userName = '" + userName + "'";
    conn.query(selectUser).then(function (user) {

        if (user.length > 0 && user[0].userName == userName && user[0].passWord == oldPassWord) {
            
            var updateUser = "update `users` set passWord = '" + newPassWord + "' where userName = '" + userName + "'";
            return conn.query(updateUser);
        }
        else {
            
            var sendObj = { "errcode": "20005", "errmsg": "用户名或密码不对!" };
            res.send(200, sendObj);
        }
    }).then(function (rows) {

        var sendObj = { "errcode": "0", "errmsg": "修改用户名成功!" };
        res.send(200, sendObj);

    }, function (err) {

        console.log(err);
        console.log(err.sqlState);

        var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
        res.send(200, sendObj);
    });
};

/*
 * 添加商店
 */
 exports.addShop = function (conn, req, res) {
    var data = req.body;
    var name = data.name,
        userId = data.userId,
        userName = data.userName,
        infoText = data.infoText,
        address = data.address,
        tel = data.tel;

    var sqlStr = "INSERT INTO `shop` (name, userId, userName, info, address, telephone) VALUES ('" 
                    + name + "','" + userId + "','" + userName + "','" + infoText + "','" + address + "','" + telephone + "')";
    conn.query(sqlStr).then(function (rows) {
        
        console.log("insert ok:", rows);
        var sendObj = { "errcode": "0", "errmsg": "添加商店成功!" };
        res.send(200, sendObj);

    }, function (err) {
        
        console.log("insert err:", err);
        console.log("insert err:", err.sqlState);
        var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
        res.send(200, sendObj);
    });
    //conn.query('USE ' + CommonData.Database);
};

/*
 * 添加大类
 */
exports.addBigClass = function (conn, req, res) {
    var data = req.body;
    var className  = data.className,
        shopId = data.shopId;

    var insertStr = "INSERT INTO `bigclass` (`name`, `shopId`) VALUES ('" + className + "', '" + shopId + "')";

    conn.query(insertStr).then(function (rows) {
        
        console.log("insert ok:", rows);
        var sendObj = { "errcode": "0", "errmsg": "添加大类成功!" };
        res.send(200, sendObj);

    }, function (err) {
        
        console.log("insert err:", err);
        console.log("insert err:", err.sqlState);
        var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
        res.send(200, sendObj);
    });
};

/*
 * 添加小类
 */
exports.addSmallClass = function (conn, req, res) {
    var data = req.body;
    var className = data.className,
        bigId = data.bigId;

    var insertStr = "INSERT INTO `smallclass` (`name`, `bigId`) VALUES ('" + className + "', '" + bigId + "')";

    conn.query(insertStr).then(function (rows) {
        
        console.log("insert ok:", rows);
        var sendObj = { "errcode": "0", "errmsg": "添加小类成功!" };
        res.send(200, sendObj);

    }, function (err) {
        
        console.log("insert err:", err);
        console.log("insert err:", err.sqlState);
        var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
        res.send(200, sendObj);
    });
};

/*
 * 添加产品
 */
exports.addProduct = function (conn, req, res) {
    var data = req.body;
    var name = data.name, 
        smallId = data.smallId, 
        bigId = data.bigId, 
        shopId = data.shopId;

    var insertStr = "INSERT INTO `products` (`name`, `smallId`, `bigId`, `shopId`) VALUES ('" + name + "','" + smallId + "','" + bigId + "','" + shopId + "')";
    
    insertCallback(conn, req, res, insertStr, "产品");
};

/*
 * 添加进货记录，其中version进货批次为前端手动填写：可以统一自定义规范化（比如填时间）
 */
exports.addStock = function (conn, req, res) {
    var data = req.body;
    var productId = data.productId,
        version = data.version,
        stockPrice = data.stockPrice,
        stockNumber = data.stockNumber,
        stockTime = data.stockTime;

    var insertStr = "INSERT INTO `stock` (`productId`, `version`, `stockPrice`, `stockNumber`, `stockTime`) VALUES ('" 
                         + productId + "', '" + version + "','" + stockPrice + "','" + stockNumber + "','" + stockTime + "')";
    
    insertCallback(conn, req, res, insertStr, "进货记录");
};

/*
 * 添加销售记录
 */
exports.addSale = function (conn, req, res) {
    var data = req.body;
    var name = data.name,
        productId = data.productId,
        version = data.version,
        number = data.number,
        saleTime = data.saleTime,
        salePrice = data.salePrice;

    var insertStr = "INSERT INTO `sales` (`productId`, `name`, `version`, `salePrice`, `saleNumber`, `saleTime`) VALUES ('" 
                        + productId + "', '" + name + "','" + version + "','" + salePrice + "','" + saleNumber + "','" + saleTime + "')";

    insertCallback(conn, req, res, insertStr, "销售记录");
};

function insertCallback(conn, req, res, insertStr, str) {
    conn.query(insertStr).then(function (rows) {
        
        console.log("insert ok:", rows);
        var sendObj = { "errcode": "0", "errmsg": "添加" + str + "成功!" };
        res.send(200, sendObj);

    }, function (err) {
        console.log("insert err:", insertStr);
        console.log("insert err:", err.sqlState);
        var sendObj = { "errcode": "20002", "errmsg": "执行数据库查询错误!" };
        res.send(200, sendObj);
    });
}