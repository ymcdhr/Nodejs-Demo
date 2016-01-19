/**
 * Created by cckk on 2015/6/28.
 */

var BasicInfoNamespace=new Object();
//BasicInfoNamespace.productBigClass=new Array();
//BasicInfoNamespace.productSmallClass=new Array();
//BasicInfoNamespace.productName=new Array();
//BasicInfoNamespace.productCompany=new Array();

$(document).ready(function(){

    //$("#class1-button").click(function(){
    //    var productBigClass=$("#class1").val();
    //    BasicInfoNamespace.productBigClass.push(productBigClass);
    //    console.log(BasicInfoNamespace);
    //});
    //
    //$("#class2-button").click(function(){
    //    var productSmallClass=$("#class2").val();
    //    BasicInfoNamespace.productSmallClass.push(productSmallClass);
    //    console.log(BasicInfoNamespace);
    //});
    //
    //$("#name-button").click(function(){
    //    var productName=$("#product-name").val();
    //    BasicInfoNamespace.productName.push(productName);
    //    console.log(BasicInfoNamespace);
    //});
    //
    //$("#company-button").click(function(){
    //    var productCompany=$("#product-company").val();
    //    BasicInfoNamespace.productCompany.push(productCompany);
    //    console.log(BasicInfoNamespace);
    //});

//    writeFile('/localFiles/localFiles.txt',"xxxx");
});

BasicInfoNamespace={
    bigClass:[
        {
            bigId:1,
            name:"水管"
        },
        {
            bigId:2,
            name:"灯泡"
        },
        {
            bigId:3,
            name:"洁具"
        },
        {
            bigId:4,
            name:"厨具"
        }
    ],
    smallClass:[
        {
            bigId:1,
            smallId:1,
            name:"塑料水管",
            products:["xxx1塑料水管","xxx2塑料水管","xxx3塑料水管"]
        },
        {
            bigId:2,
            smallId:2,
            name:"灯泡子类1",
            products:[]
        },
        {
            bigId:3,
            smallId:3,
            name:"洁具子类1",
            products:[]
        },
        {
            bigId:4,
            smallId:4,
            name:"厨具子类1",
            products:[]
        },
        {
            bigId:1,
            smallId:5,
            name:"金属水管",
            products:["xxx1金属水管","xxx2金属水管","xxx3金属水管"]
        }
    ],
    company:[
        "鸽派总部","子公司"
    ],
    products:[
        {
            bigId: 1,
            smallId: 1,
            productId: 1,
            name: "xxx1塑料水管"
        },
        {
            bigId: 1,
            smallId: 1,
            productId: 2,
            name: "xxx2塑料水管"
        },
        {
            bigId: 1,
            smallId: 1,
            productId: 3,
            name: "xxx3塑料水管"
        },
        {
            bigId: 1,
            smallId: 1,
            productId: 4,
            name: "xxx4塑料水管"
        },
        {
            bigId: 1,
            smallId: 5,
            productId: 5,
            name: "xxx1金属水管"
        },
        {
            bigId: 1,
            smallId: 5,
            productId: 6,
            name: "xxx2金属水管"
        }
    ]
};