
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var data = require('./js/data.js');
var time = require('./js/timeFuncs.js');
var comFunc = require('./js/commonFuncs.js');
var insertSql = require('./js/insertData.js');
var selectSql = require('./js/selectData.js');

var CommonData = require('./js/CommonData.js');

//数据库模块
//var mysql = require('mysql');
var mysql = require('promise-mysql');//promise-mysql用法参考：https://github.com/lukeb-uk/node-promise-mysql

//读写文件模块
var app = express();
var fs = require('fs');


//解析body数据模块
var bodyParser = require('body-parser');

// 解析json格式的数据，parse application/json
app.use(bodyParser.json());

// 解析application/x-www-form-urlencoded格式数据，parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * 连接数据库
 */ 
var newSQL = new ConDataBase();
newSQL.conMysql();//连接数据库
//newSQL.excuteSQL();//执行数据库语句
//newSQL.closeConn();//关闭数据库连接


/*
 * HTTP请求接受与发送
 */
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);


/**
 * 获取商店基本信息
 */
app.get('/api/getBasicInfo', function (req, res) {
    selectSql.selectBasicInfo(newSQL.conn, req.url, req, res);

});

/*
 * 发送销售数据：按照时间段
 */
app.get('/api/saleData', function (req, res) {
    selectDataCommon("selectSale", req, res);  //根据类别返回数据
});

/*
 * 发送库存数据：按照时间段
 */
app.get('/api/stockData', function (req, res) {
    selectDataCommon("selectStock", req, res);
});

/*
 * 发送商店类别：根据shopId
 */
app.get('/api/getClasses', function (req, res) {
    selectDataCommon("selectClass", req, res);
});

/*
 * 查询数据通用函数
 */
function selectDataCommon(selectFunc, req, res) {
    try {
        console.log("查询的函数：", selectFunc);
        console.log("查询的url：", req.url);

        var selectFunction = selectSql[selectFunc];
        selectFunction(newSQL.conn, req.url, req, res);
    } catch (e) {
        res.send(200, { "errcode": "20002", "errmsg": e.message });
    }
}

function  defaultSuccess(rows, req, res) {
    if (rows.length > 0) {
        res.send(200, { "errcode": "0", "errmsg": rows });
    }
    else {
        res.send(200, { "errcode": "20003", "errmsg": "no data!" });
    }
}




/*
 * 登陆认证
 */
app.get('/api/login', function (req, res) {
    selectDataCommon("selectLogin", req, res, loginSuccess);  //根据类别返回数据

    var loginSuccess = function (row) {
        console.log("登陆成功！");
        console.log(row);
        if (rows.length > 0) {
            res.send(200, { "errcode": "0", "errmsg": rows });
        }
        else {
            res.send(200, { "errcode": "20003", "errmsg": "no data!" });
        }
    };
});
/*
 * 添加用户
 */
app.post('/api/addUser', function (req, res) {
    addDataCommon("addUser", req, res);
});

/**
 * 修改用户名密码
 */
app.post('/api/modifyUserPwd', function (req, res) {
    addDataCommon("modifyUserPwd", req, res);
});

/*
 * 添加商店
 */
app.post('/api/addShop', function (req, res) {
    addDataCommon("addShop", req, res);
});

/*
 * 添加大类
 */
app.post('/api/addBigClass', function (req, res) {
    addDataCommon("addBigClass", req, res);
});

/*
 * 添加小类
 */
app.post('/api/addSmallClass', function (req, res) {
    addDataCommon("addSmallClass", req, res);
});

/*
 * 添加产品
 */
app.post('/api/addProduct', function (req, res) {
    addDataCommon("addProduct", req, res);
});

/*
 * 添加销售记录 
 */
app.post('/api/addSaleData', function (req, res) {
    addDataCommon("addSale", req, res);
});


/*
 * 添加进货记录
 */
app.post('/api/addStockData', function (req, res) {
    addDataCommon("addStock", req, res);
});


/*
 * 添加数据通用函数
 */
//function addDataCommon(addFunc, req, res){
//    try {
//        var addFunction = insertSql[addFunc];
//        addFunction(newSQL.conn, req.body, function (success) {
//            res.send(200, { "errcode": "0", "errmsg": success });
//        }, function (error) {
//            res.send(200, { "errcode": "20001", "errmsg": error });
//        });
//    } catch (e) {
//        res.send(200, { "errcode": "20002", "errmsg": e.message });
//    }
//}

function addDataCommon(addFunc, req, res){
    try {
        console.log("插入的函数：", addFunc);
        console.log("插入的数据：", req.body);

        var addFunction = insertSql[addFunc];

        addFunction(newSQL.conn, req, res);

    } catch (e) {
        res.send(200, { "errcode": "20002", "errmsg": e.message });
    }
}


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});





/*
 * MySQL数据库操作相关 
 */
function ConDataBase(){
    var sys = require('sys');
    this.host = "localhost";
    this.user = "root";
    this.port = 3306;
    this.database = "account";
    this.password = "root123";
    var _this = this;
    //连接数据库
    this.conMysql = function () {
        mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        }).then(function (conn) {
            _this.conn = conn;
        });
        //this.conn.connect(function (error, results) {
        //    if (error) {
        //        console.log('Connection Error: ' + error.message);
        //        return;
        //    }
        //    console.log('Connected to MySQL');
        //});
        //createTable(conn);

        //this.conn.connect().then(function () {
        
        //});
    };

    //数据库操作函数
    this.excuteSQL = function (excuteSQLFunc) {
        excuteSQLFunc();

        //excuteSql.addBigClass(this.conn, "塑料管大类", "ymcdhr");//添加大类
        //excuteSql.addSmallClass(this.conn, "塑料管小类01", "1");//添加小类
        //excuteSql.addSmallClass(this.conn, "塑料管小类02", "1");//添加小类

        //var sqlSmallClass = "SELECT * FROM smallclass where bigId=1";//根据大类ID查询对应的所有小类
        //excuteSql.selectSql(this.conn, sqlSmallClass, function (data) { 
        //    //....
        //});

        //var sqlSmallClass = "SELECT * FROM smallclass where bigId=1";//根据商店ID查询对应的所有大类
        //excuteSql.selectSql(this.conn, sqlSmallClass, function (data) { 
        //    //....
        //});

        //excuteSql.addProduct(this.conn, "塑料管XXX01", 1, 1, 2);//添加产品，参数：productName, smallId, bigId, shopId
        //excuteSql.addProduct(this.conn, "塑料管XXX02", 1, 1, 2);//添加产品
        //excuteSql.addProduct(this.conn, "塑料管ZZZ01", 1, 1, 2);//添加产品
        //excuteSql.addProduct(this.conn, "塑料管ZZZ02", 1, 1, 2);//添加产品
        //excuteSql.addProduct(this.conn, "塑料管YYY01", 1, 1, 2);//添加产品

        //excuteSql.addSale(this.conn, "塑料管YYY01", 11, 1411234324);//添加销售记录
    };

    //关闭数据库连接
    this.closeConn = function () {
        this.conn.end();
    };
    
    //创建数据库表
    this.createTable = function () {
        
        TEST_DATABASE = 'account',//要创建的数据库名

        TEST_TABLE = 'sales';//要创建的表名
        
        var createTableStr = "CREATE TABLE `sales` (" 
          + "`id` INT NOT NULL," 
          + "`productId` INT NOT NULL, " 
          + "`version` VARCHAR(45) NOT NULL, " 
          + "`number` INT NOT NULL, " 
          + "UNIQUE INDEX `id_UNIQUE` (`id` ASC), " 
          + "PRIMARY KEY (`id`));";
        
        this.conn.query('USE ' + TEST_DATABASE);
        
        this.conn.query(createTableStr, function (err, rows, fields) {
            if (err) throw err;
        });
    };
}