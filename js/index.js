/**
 * Created by cckk on 2015/6/28.
 */


$(document).ready(function(){
        navsFunc();
});
function navsFunc(){

    $("#nav-management").click(function(){
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
        $("#iframe_index").attr("src","pages/management/management.html");
    });

    $("#nav-sale").click(function(){
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
        $("#iframe_index").attr("src","pages/sale/sale.html");
    });

    $("#nav-stock").click(function(){
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
        $("#iframe_index").attr("src","pages/stock/stock.html");
    });
}