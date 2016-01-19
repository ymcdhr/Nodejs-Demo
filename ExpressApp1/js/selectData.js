var COM = require('./CommonData.js');
var TI = require('./timeFuncs.js');

/**
 * 查询商店基本信息
 */
exports.selectBasicInfo = function (conn, url, req, res) {
    //商店shopId
    var urlArray = url.split("&");
    var shopId = urlArray[0].split("=")[1];
    
    //本周起始时间
    var weekStart = TI.getCurrentMounth.weekStart;
    var wekkEnd = TI.getCurrentMounth.wekkEnd;
    
    var selectShop = "SELECT * FROM account.shop where id=" + shopId;
    var shopData = null;
    var bigClass = null;
    var smallClass = null;

    //执行查询
    conn.query(selectShop).then(function (shop){//查询商店
        
        shopData = shop[0];
        var selectBig = "SELECT * FROM bigclass where shopId=" + shopId;
        return conn.query(selectBig);//查询商店类别数据

    }).then(function (bigClasses) {
        
        bigClass = bigClasses;

        var selectSmall = "SELECT * FROM smallclass where bigId in (SELECT id as bigClassId FROM bigclass where shopId="+ shopId+")";
        return conn.query(selectSmall);//查询销售数据

    }).then(function (smallClasses) {
        
        smallClass = smallClasses;

        var selectSale = "SELECT s.*,p.smallId, p.bigId FROM sales s, products p where s.productid = p.id and p.shopid = " + shopId;
        return conn.query(selectSale);//查询销售数据

    }).then(function (rows) {
        
        console.log("查询成功！");
        var shopClass = setClasses(bigClass, smallClass);
        var sendData = {
            "shop": shopData,
            "class": shopClass,
            "sales": rows
        };

        var sendObj = rows.length > 0?{ "errcode": "0", "errmsg": sendData }:{ "errcode": "20003", "errmsg": "no data!" };
        res.send(200, sendObj);

    }, function (err) {
        
        console.log("查询错误！");
        res.send(200, { "errcode": "20001", "errmsg": error });

    });
};

//根据查询设置大小类别数据并返回
function setClasses(bigClass, smallClass){
    var newClasses = [];
    for (var i = 0; i < bigClass.length; i++) {
        var bigObj = bigClass[i];
        bigObj.smallClass = [];
        for (var j = 0; j < smallClass.length; j++) {
            if (bigObj.id == smallClass[j].bigId) {
                bigObj.smallClass.push(smallClass[j]);
            }
        }
        newClasses.push(bigObj);
    }

    return newClasses
}

/*
 * 查询销售记录
 * 查询参数：shopId，时间段
 */
exports.selectSale = function (conn, url, req, res) {
    var urlArray = url.split("&");
    var shopId = urlArray[0].split("=")[1];
    
    if (urlArray[1] && urlArray[2]) {
        var startTime = urlArray[1].split("=")[1],
            endTime = urlArray[2].split("=")[1];

        if (urlArray[3] && urlArray[4]) {
            var bigId = urlArray[3].split("=")[1],
                smallId = urlArray[4].split("=")[1];
            var sqlStr = "SELECT s.*,p.smallId, p.bigId FROM sales s, products p where s.productid = p.id and p.shopid = " + shopId + " and saleTime >= " + startTime + " and saleTime <= " + endTime + " and p.smallId=" + smallId + " and p.bigId =" + bigId;
        }
        else {
            var sqlStr = "SELECT s.*,p.smallId, p.bigId FROM sales s, products p where s.productid = p.id and p.shopid = " + shopId + " and saleTime >= " + startTime + " and saleTime <= " + endTime;
        }
    }
    else {
        if (urlArray[3] && urlArray[4]) {
            var bigId = urlArray[3].split("=")[1],
                smallId = urlArray[4].split("=")[1];
            var sqlStr = "SELECT s.*,p.smallId, p.bigId FROM sales s, products p where s.productid = p.id and p.shopid = " + shopId + " and p.smallId=" + smallId + " and p.bigId =" + bigId;
        }
        else {
            var sqlStr = "SELECT s.*,p.smallId, p.bigId FROM sales s, products p where s.productid = p.id and p.shopid = " + shopId;
        }
    }
    
    //执行查询
    conn.query(sqlStr).then(function (rows) {

        console.log("查询成功！")
        var sendObj = rows.length > 0?{ "errcode": "0", "errmsg": rows }:{ "errcode": "20003", "errmsg": "no data!" };
        res.send(200, sendObj);

    }, function (err) {

        console.log("查询错误！")
        res.send(200, { "errcode": "20001", "errmsg": error });

    });;
};

/*
 * 查询进货记录
 * 查询参数：shopId，时间段
 */
exports.selectStock = function (conn, url, req, res) {
    var urlArray = url.split("&");
    var shopId = urlArray[0].split("=")[1];
    if (urlArray[1] && urlArray[2]) {
        var startTime = urlArray[1].split("=")[1],
            endTime = urlArray[2].split("=")[1],
            sqlStr = "SELECT * FROM stock where productId in " 
                    + "(SELECT products.id FROM shop, products WHERE products.shopId = " + shopId + ") and stockTime>=" + startTime + " and stockTime<=" + endTime;
    }
    else {
        var sqlStr = "SELECT * FROM stock where productId in " 
                    + "(SELECT products.id FROM shop, products WHERE products.shopId = " + shopId + ")";
    }

    //执行查询
    conn.query(sqlStr).then(function (rows) {
        
        console.log("查询成功！")
        var sendObj = rows.length > 0?{ "errcode": "0", "errmsg": rows }:{ "errcode": "20003", "errmsg": "no data!" };
        res.send(200, sendObj);

    }, function (err) {
        
        console.log("查询错误！")
        res.send(200, { "errcode": "20001", "errmsg": error });

    });;
};


/*
 * 查询登陆的用户
 * 查询参数：
 */
exports.selectLogin = function (conn, url, req, res, success, error) {
    var urlArray = url.split("&");

    if (urlArray[0] && urlArray[1]) {
        var userName = urlArray[0].split("=")[1],
            passWord = urlArray[1].split("=")[1],
            sqlStr = "SELECT s.* FROM users u,shop s where u.id=s.userId and u.userName='" + userName + "' and u.password='" + passWord + "'";
    }
    else {
    }
    selectSql(conn, sqlStr, req, res, success, error);
};


/*
 * 查询商店类别：大类以及对应的小类
 * 查询参数：
 */
exports.selectClass = function (conn, url, req, res) {
    var urlArray = url.split("?");

    if (urlArray[1]) {
        var shopId = urlArray[1].split("=")[1],
            sqlStr1 = "SELECT * FROM bigclass b where b.shopId=" + shopId + ";";

        conn.query(sqlStr1, function (err, rows1) {
            if (err) {
                console.log("sqlStr1查询错误！");
                if (error) {
                    error(err);
                }
            }
            if (rows1) {
                console.log("sqlStr1查询成功！");
                console.log(rows1);
                
                if (rows1.length > 0) {
                    var bigId = rows1[0].id,
                        sqlStr2 = " SELECT * FROM smallclass s where s.bigId=" + bigId + ";",
                        bigObj = [rows1[0]];
                    
                    conn.query(sqlStr2, function (err, rows2) {
                        if (err) {
                            console.log("sqlStr2查询错误！");
                            if (error) error(err);
                        }
                        if (rows2) {
                            bigObj[0].smallClasses = JSON.stringify(rows2);
                            console.log("sqlStr2查询成功！");
                            if (success) {
                                success(bigObj);
                                res.send(200, { "errcode": "0", "errmsg": bigObj });
                            }                            ;
                        }
                    });
                }
                else {
                    res.send(200, { "errcode": "20003", "errmsg": "no data!" });
                }
            }
        });

    }
    else {
    }
};

/*
 * 通用查询语句
 */
//function selectSql(conn, sqlStr, req, res) {
//    console.log(sqlStr);
//    conn.query(sqlStr, function (err, rows) {
//        if (err) {
//            console.log("查询错误！")
//            res.send(200, { "errcode": "20001", "errmsg": error });
//        }
//        if (rows) {
//            console.log("查询成功！")
//            if (rows.length > 0) {
//                res.send(200, { "errcode": "0", "errmsg": rows });
//            }
//            else {
//                res.send(200, { "errcode": "20003", "errmsg": "no data!" });
//            }
//        }
//    });
//};

/*
 * 通用查询语句
 */
//function selectSql(conn, sqlStr) {
//    console.log(sqlStr);
//    try {
//        return conn.query(sqlStr);
//    }
//    catch (e) {
//        console.log(e.message);
//    }
//};