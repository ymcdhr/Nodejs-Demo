var timeData= require('./timeFuncs.js');

var saleData = [
    {
    time: 1433124608,
    id: 1,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1435716608,
    id: 2,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1435716608,
    id: 3,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1392430208,
    id: 4,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1392430208,
    id: 5,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1392430208,
    id: 6,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1435838167,
    id: 7,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
},
    {
    time: 1435838167,
    id: 8,
    productName: "xxx1水管",
    bigClass: "水管",
    smallClass: "塑料水管",
    salePrice: 5,
    saleNum: 2,
    totalPrice: 10,
    remark: "无"
}
];

function getMounthData(SaleData) {
    var nowMounth = new Date().getMonth();
    var newArray = new Array();
    
    for (var i = 0; i < SaleData.length; i++) {
        var item = SaleData[i];
        var saleMounth = timeData.getCommonTime(item.time + "000").getMonth();
        if (saleMounth === nowMounth) {
            newArray.push(item);
        }
    }
    return newArray;
}

function getYearData(SaleData) {
    var nowYear = new Date().getYear();
    var newArray = new Array();
    
    for (var i = 0; i < SaleData.length; i++) {
        var item = SaleData[i];
        var saleYear = timeData.getCommonTime(item.time + "000").getYear();
        if (saleYear === nowYear) {
            newArray.push(item);
        }
    }
    return newArray;
}

exports.SaleData = saleData;
exports.SaleDataMounth = getMounthData(saleData);
exports.SaleDataYear = getYearData(saleData);