// 页面加载事件
$(document).ready(function () {
    $(".titleFrist").fadeOut();
    $(".titleTime").fadeOut();
    setTimeout('$("#maxImgBg").fadeOut()', 1100)
    setTimeout('$(".titleFrist").fadeIn()', 1500)
    setTimeout('$(".titleTime").fadeIn()', 1900)

    daysum(); //计算时间
})

//滚动距离事件
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        $(".titleTime").text("驻足于此，回望群星")
    } else {
        $(".titleTime").text("驻足于此，回望现实")
    }
})

//游戏总运行时间计算
function daysum() {
    var timeMod = new Date();

    var mon2 = 28;
    var arr = [31, mon2, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var year = timeMod.getFullYear();
    var mon = timeMod.getMonth() + 1;
    var day = timeMod.getDate()
    var sum = 0;
    if ((year % 4 == 0 & year % 100 != 0) || (year % 400 == 0)) {
        mon2 = 29;
    }
    for (i = 0; i < mon - 1; i++) {
        sum += arr[i];
    }
    sum += parseInt(day);
    var leapYear = parseInt((year - 2009) / 4);
    var last2009 = 228;
    var totalTime = ((year - 1) - 2009) * 365 + last2009 + sum + leapYear;

    $("#contentPage_1 .pageText_1 .text_1").text("截至目前已运行了 " + totalTime + " 天");
}

//社团总运营时间计算
// var groupSum = setInterval(
//     function groupSum() {
//         var timeMod = new Date();

//         var mon2 = 28;
//         var arr = [31, mon2, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//         var year = timeMod.getFullYear();
//         var mon = timeMod.getMonth() + 1;
//         var day = timeMod.getDate()
//         var sum = 0;
//         if ((year % 4 == 0 & year % 100 != 0) || (year % 400 == 0)) {
//             mon2 = 29;
//         }
//         for (i = 0; i < mon - 1; i++) {
//             sum += arr[i];
//         }
//         sum += parseInt(day);
//         var leapYear = parseInt((year - 2016) / 4);
//         var last2016 = 63;
//         var totalTime = ((year - 1) - 2016) * 365 + last2016 + sum + leapYear; 

//         var totalH = timeMod.getHours();
//         var totalM = timeMod.getMinutes();
//         var totalS = timeMod.getSeconds();

//         if ((Number(totalH).toString().length) < 2) {
//             totalH = "0" + totalH;
//         }
//         if ((Number(totalM).toString().length) < 2) {
//             totalM = "0" + totalM;
//         }
//         if ((Number(totalS).toString().length) < 2) {
//             totalS = "0" + totalS;
//         }

//         var printSum = totalTime + " 天" + totalH + "小时" + totalM + "分钟" + totalS + "秒";

//         $("#bottomPage .showBox .text_1").text(printSum);
//     }, 1000);

function groupSum() {
    var timeMod = new Date();

    var mon2 = 28;
    var year = timeMod.getFullYear();
    var mon = timeMod.getMonth() + 1;
    var day = timeMod.getDate()
    var sum = 0;
    if ((year % 4 == 0 & year % 100 != 0) || (year % 400 == 0)) {
        mon2 = 29;
    }
    var arr = [31, mon2, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (i = 0; i < mon - 1; i++) {
        sum += arr[i];
    }
    sum += parseInt(day);
    var leapYear = parseInt((year - 2016) / 4);
    var last2016 = 63;
    var totalTime = ((year - 1) - 2016) * 365 + last2016 + sum + leapYear;

    $("#contentPage_1 .pageText_1 .text_1").text("自建立起已活跃了 " + totalTime + " 天");
    $("#show_box .show_big .show_text .introductionTime").text(totalTime);

}

// 时间计算文本切换显示
setInterval(
    function () {
        $("#contentPage_1 .pageText_1 .text_0").fadeOut(1000);
        $("#contentPage_1 .pageText_1 .text_1").fadeOut(1000);
        setTimeout(function () {
            console.log($("#contentPage_1 .pageText_1 .text_0").text());
            if ($("#contentPage_1 .pageText_1 .text_0").text().toString() == "MINECRAFT") {
                $("#contentPage_1 .pageText_1 .text_0").text("黄金之匣美工社");
                groupSum(); //计算社团时间

            } else if ($("#contentPage_1 .pageText_1 .text_0").text().toString() == "黄金之匣美工社") {
                $("#contentPage_1 .pageText_1 .text_0").text("MINECRAFT");
                daysum(); //计算时间
            }
            $("#contentPage_1 .pageText_1 .text_0").fadeIn(1000);
            $("#contentPage_1 .pageText_1 .text_1").fadeIn(1000);
        }, 1000)
    }, 10000);

//滚动显示事件
$(document).ready(function () {
    $("#contentPage_1 .pageText_1").fadeOut();
    $("#contentPage_2 .showBox1").fadeOut();
    $("#contentPage_2 .showText1").fadeOut();
    $("#contentPage_3 .showBox1").fadeOut();
})

$(window).scroll(function () {
    if ($(window).scrollTop() > 150) {
        $("#contentPage_1 .pageText_1").fadeIn(1000);
    }
    if ($(window).scrollTop() > 550) {
        $("#contentPage_2 .showBox1").fadeIn(1000);
        $("#contentPage_2 .showText1").fadeIn(1000);
    }
    if ($(window).scrollTop() > 800) {
        $("#contentPage_3 .showBox1").fadeIn(1000);
    }
})
