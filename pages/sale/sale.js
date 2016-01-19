/**
 * Created by cckk on 2015/6/28.
 */

$(document).ready(function() {
    //设置销售数据
    setSalesData(SaleNamespace);
    changeSalesData();
});

function changeSalesData(){

    $(".sale-nav").click(function(e){
        event.preventDefault();
        $(".sale-nav li").removeClass("active");
        $(e.target).parent().addClass("active");

        if(e.target.id=="today-sales"){
            setSalesData(SaleNamespace);
        }
        else if(e.target.id=="mounth-sales"){
            var mounthSalesData=getMounthSalesData(SaleNamespace);
            setSalesData(mounthSalesData);
        }
        else if(e.target.id=="year-sales"){
            var yearSalesData=getYearSalesData(SaleNamespace);
            setSalesData(yearSalesData);
        }
        else{
            location.href="../addSale/addSale.html";
        }
    });
}

function getMounthSalesData(SaleData) {
    var nowMounth = new Date().getMonth();
    var newArray = new Array();

    for (var i = 0; i < SaleData.length; i++) {
        var item=SaleData[i];
        var saleMounth=getCommonTime(item.saleTime+"000").getMonth();
        if(saleMounth===nowMounth){
            newArray.push(item);
        }
    }
    return newArray;
}

function getYearSalesData(SaleData) {
    var nowYear = new Date().getYear();
    var newArray = new Array();

    for (var i = 0; i < SaleData.length; i++) {
        var item=SaleData[i];
        var saleYear=getCommonTime(item.saleTime+"000").getYear();
        if(saleYear===nowYear){
            newArray.push(item);
        }
    }
    return newArray;
}

//设置销售数据
function setSalesData(SaleData){
    var classNameType=["success","warning","danger","info","active"];
    $(".sales-data").remove();//清空数据
    for(var i=0;i<SaleData.length;i++){
        var k=i%5;
        var item=SaleData[i];
        var saleTime=getCommonTime(item.saleTime*1000).toLocaleString();
        $("#sale-table").append("" +
        "<tr class='"+classNameType[k]+" sales-data'><td>"+saleTime+"</td><td>"+item.id+"</td><td>"+item.productName+"</td><td>"+item.bigClass+"</td><td>"+item.smallClass+"</td><td>"+item.salePrice+"</td><td>"+item.saleNum+"</td><td>"+item.totalPrice+"</td><td>"+item.remark+"</td></tr>"
        +"");
    }
}


var SaleNamespace=new Array();
SaleNamespace=[
    {
        saleTime: 1433124608,
        id: 1,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1435716608,
        id: 2,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1435716608,
        id: 3,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1392430208,
        id: 4,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1392430208,
        id: 5,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1392430208,
        id: 6,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1435838167,
        id: 7,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    },
    {
        saleTime: 1435838167,
        id: 8,
        productName:"xxx1水管",
        bigClass:"水管",
        smallClass:"塑料水管",
        salePrice:5,
        saleNum:2,
        totalPrice:10,
        remark:"无"
    }
];



