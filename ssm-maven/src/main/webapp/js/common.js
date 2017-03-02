// 获取当前日期时间
function getCurrentDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return year + "-" + formatZero(month) + "-" + formatZero(day) + " " + formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds);
}

// 获取当前日期
function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + formatZero(month) + "-" + formatZero(day);
}


function formatZero(n) {
    if (n >= 0 && n <= 9) {
        return "0" + n;
    } else {
        return n;
    }
}