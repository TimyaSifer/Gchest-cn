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
        if ($(window).scrollTop() > 1200) {
            $("#contentPage_3 .showBox1").fadeIn(1000);
        }
    })