//dataArray中是否存在相同的item，存在的话返回其中的item

exports.isCommonData = function (item, dataArray, ref) {
    for (var i = 0; i < dataArray.length; i++) {
        if (item[ref] == dataArray[i][ref]) {
            return dataArray[i];
        }
    }
    return false;
}