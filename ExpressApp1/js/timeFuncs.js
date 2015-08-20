/**
 * Created by 茂超 on 2015/7/2.
 */
/*
 * 函数：转换Unix时间为本地时间，接口用
 * 参数：Unix时间，数字类型
 * 返回值：本地时间，对象类型
 **/
exports.getCommonTime = function (unixTime) {

    var currentTime = new Date();  //新建对象
    currentTime.setTime(unixTime);//通过UNIX时间设置对象

    return currentTime;
}