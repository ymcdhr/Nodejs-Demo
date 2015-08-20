
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
//数据库模块
var mysql = require('mysql');
//读写文件模块
var app = express();
var fs = require('fs');
//解析body数据模块
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false })); //加上这句试试
// parse application/json  
//app.use(bodyParser.json());

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
app.get('/api/saleData', function (req, res) {
    console.log("req:" + req);
    res.send(200, data.SaleData);
    
});

app.get('/api/saleDataMounth', function (req, res) {
    console.log("req:" + req);
    console.log("data:" + data.SaleDataMounth);

    res.send(200, data.SaleDataMounth);
    
});
var year = new Date().getYear();
var mounth = new Date().getMonth() + 1;
var date = new Date().getDate();
var timeStamp = year + '_' + mounth + '_' + date;

//发送销售数据
app.get('/api/saleDataYear', function (req, res) {
    console.log("req:" + req);

});

//接受提交销售数据
app.post('/api/addSaleData', function (req, res) {
    console.log(typeof (req.body));
    console.log(req.body);

    var newArray = req.body;

    res.send(200, { "errcode":"0","errmsg": req.body });

});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

conMysql();
function conMysql() {
    var sys = require('sys');

    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'account',
        port: 3306
    });
    conn.connect(function (error, results) {
        if (error) {
            console.log('Connection Error: ' + error.message);
            return;
        }
        console.log('Connected to MySQL');
    });

    //createTable(conn);

    conn.end();
}


function createTable(conn){
    //要创建的数据库名
    TEST_DATABASE = 'account',

    //要创建的表名
    TEST_TABLE = 'test1';
    
    var createTableStr = 'create table ' + TEST_TABLE +'(id integer auto_increment, title varchar(255), primary key (id))';
    
    conn.query('USE ' + TEST_DATABASE);
    conn.query(createTableStr);
}
