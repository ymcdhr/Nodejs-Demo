/**
 * Created by cckk on 2015/6/28.
 */

$(document).ready(function() {

    console.log(BasicInfoNamespace);
    setBigClass();

});


function setBigClass(){
    var bigClass=BasicInfoNamespace.bigClass;
    for(var i=0;i<bigClass.length;i++){
        var bigClassName=bigClass[i].name;
        var smallClassStr=setSmallClassStr(bigClass[i].bigId);
        var bigClassStr="<a class='dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>"+bigClassName+" <span class='caret'></span></a>"
            +"<ul class='dropdown-menu'>"
            +smallClassStr
            +"</ul>";
        if(i<1){
            $("#add-sale-nav").append("<li role='presentation' class='active'>" +bigClassStr+"</li>");
        }
        else{
            $("#add-sale-nav").append("<li role='presentation'>" +bigClassStr+"</li>");
        }
    }
    console.log(bigClassStr);
}
function setSmallClassStr(bigClassId){
    var str="";
    var smallClassArray=getSmallClass(bigClassId);
    for(var i=0;i<smallClassArray.length;i++){
        str+="<li><a href='#'>"+smallClassArray[i].name+"</a><input type='hidden' value='"+smallClassArray[i].smallId+"'></li>";
    }
    return str;
}
function getSmallClass(bigClassId){
    var newArray=new Array();
    for(var i=0;i<BasicInfoNamespace.smallClass.length;i++){
        if(BasicInfoNamespace.smallClass[i].bigId==bigClassId){
            newArray.push(BasicInfoNamespace.smallClass[i]);
        }
    }
    return newArray;
}