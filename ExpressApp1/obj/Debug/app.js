
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var data = require('./js/data.js');
var time = require('./js/timeFuncs.js');

var app = express();
var fs = require('fs');

//var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded  
//app.use(bodyParser.urlencoded({ extended: true })); //加上这句试试
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

//app.configure(function () {
//    //默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析
//    //application/x-www-form-urlencoded和application/json
//    //请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：	
//    app.use(express.bodyParser());
//});// development only

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
////设置跨域访问
//app.all('*', function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//    res.header("X-Powered-By", ' 3.2.1')
//    res.header("Content-Type", "application/json;charset=utf-8");
//    next();
//});

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

app.get('/api/saleDataYear', function (req, res) {
    console.log("req:" + req);
    
    fs.readFile('json/saleData.json', function (err, data) {
        if (err) throw err;
        console.log(data);
        //var jsonObj = JSON.parse(data);
        //console.log(jsonObj);
        //res.send(200, {
        //    "errcode": 0,
        //    "errmsg": jsonObj
        //});
    });
    
});

app.post('/api/addSaleData', function (req, res) {
    console.log(typeof (req.body));
    //console.log(req.body);

    //console.log(req.body.data);

    //fs.writeFile('json/saleData.json',req.body, function (err) {
    //    if (err) throw err;
        
    //    console.log('has finished');
        
    //});

    res.send(200, { "errcode":"0","errmsg": "data saved" });
    //res.send(200, { "errcode": "1", "errmsg": req.body });

});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

