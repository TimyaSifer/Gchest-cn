// 变量
// 构造函数
class pointObj {
    constructor(pointName, pointNum, pointText) {
        this.pointName = pointName;
        this.pointNum = pointNum;
        this.pointText = pointText;
    }
}
var point0 = new pointObj("pointSkin", 0, "皮肤"); //皮肤
var point1 = new pointObj("pointModeling", 0, "模型"); //模型
var point2 = new pointObj("pointRender", 0, "渲染"); //渲染
var point3 = new pointObj("pointAnaphase", 0, "后期"); //后期
var point4 = new pointObj("pointDraw", 0, "绘画"); //绘画
var point5 = new pointObj("pointBuild", 0, "建筑"); //建筑
var point6 = new pointObj("pointLiterature", 0, "文学"); //文学
var point7 = new pointObj("pointFishing", 0, "摸鱼"); //摸鱼

var pointList = new Array(point0, point1, point2, point3, point4, point5, point6, point7);

// 负担
var AbilityNum = 0;

//界面功能
//页面加载后初始化
var skillsType = 25;
window.onload = function () {
    $(".inforSkillsTitleText").text(skillsType); //初始化调查员点数
    userCardReload(); //调查员编号赋值方法
}

//角色卡·角色编号
var Card1 = "--";
var Card2 = "none";
var Card3 = "---";
var Card4 = "-";
//刷新编号方法
function userCardReload() {
    $(".userCodeText").text(Card1 + Card2 + Card3 + Card4);
}

//通用|获取日期
var allDate = new Date();
//名字输入赋值角色卡
$(".userName").keyup(function () {
    $(".userNameText").text($(".userName").val());
    $(".maxNameLenght").text(8 - $(".userName").val().length);
})
//性别选择
$(".userSexOption ul").on("click", "li", function () {
    $(".userSexOption ul li").removeClass();
    $(this).attr("class", "userSexCheck");
    var type = $(this).text();
    $(".userSexText").text(type);
})
//合约日期
//year
$($(".loginDate span")[0]).text(allDate.getFullYear());
//month
$($(".loginDate span")[2]).text(allDate.getMonth() + 1);
if (Number($($(".loginDate span")[2]).text().length) >= 1) {
    $($(".loginDate span")[2]).text("0" + (allDate.getMonth() + 1));
}
//day
$($(".loginDate span")[4]).text(allDate.getDate());
if (Number($($(".loginDate span")[4]).text().length) < 2) {
    $($(".loginDate span")[4]).text("0" + allDate.getDate());
}
//编号·年份赋值
Card2 = ($($(".loginDate span")[0]).text()) % 1000 + $($(".loginDate span")[2]).text() + $($(".loginDate span")[
    4]).text();

//个人简介
$(".userIntroduction").keyup(function () {
    $(".maxIntroductionLenght").text(80 - $(".userIntroduction").val().length);
})
//备注
$(".userNotes").keyup(function () {
    $(".userNotesLenght").text(100 - $(".userNotes").val().length);
})

//调查员点数功能
//增加等级
$("ul li .skillsPoint").on("click", ".pointAdd", function (event) {
    var type = $(this).parent().children()[1];

    if (type.innerText >= 0 && $(".inforSkillsTitleText").text() <= skillsType && $(
            ".inforSkillsTitleText").text() > 0) {
        type.innerText = type.innerText * 1 + 1;
        for (let i = 0; i < pointList.length; i++) {
            if (pointList[i].pointName == $($(this).parent().children()[1]).attr("class")) {
                pointList[i].pointNum++;
            }
        }
        $(".inforSkillsTitleText").text($(".inforSkillsTitleText").text() * 1 - 1);
        userLevelFuc();
    } else {
        return 0;
    }

})
//降低等级
$("ul li .skillsPoint").on("click", ".pointDel", function () {
    var type = $(this).parent().children()[1];
    if (type.innerText > 0 && $(".inforSkillsTitleText").text() <= skillsType && $(
            ".inforSkillsTitleText").text() >= 0) {
        type.innerText = type.innerText * 1 - 1;
        for (let i = 0; i < pointList.length; i++) {
            if (pointList[i].pointName == $($(this).parent().children()[1]).attr("class")) {
                pointList[i].pointNum--;
            }
        }
        $(".inforSkillsTitleText").text($(".inforSkillsTitleText").text() * 1 + 1);
        userLevelFuc();
    } else {
        return 0;
    }

})

//重置点数
$(".skillsReload").click(function () {
    $(".userSkills div ul li ul li .skillsPoint span").text("0");
    $(".userSkills div ul li .inforSkillsTitleText").text("25");
    $(".userDepartmentText").text("");
    $(".userDepartment ul li").attr("class", "skillsDisables");
    Card1 = "--";
    for (let i = 0; i < pointList.length; i++) {
        pointList[i].pointNum = 0;
    }
    userCardReload();
})

//偏执开关
function userLevelFuc() {
    //美术组
    if (point0.pointNum > 4 || point3.pointNum > 4 || point4.pointNum > 4) {

        $($(".userDepartment ul li")[0]).removeClass();
    } else {
        $($(".userDepartment ul li")[0]).attr("class", "skillsDisables");
    }
    //模型组
    if (point1.pointNum > 4) {

        $($(".userDepartment ul li")[1]).removeClass();
    } else {
        $($(".userDepartment ul li")[1]).attr("class", "skillsDisables");
    }
    //渲染组
    if (point2.pointNum > 4) {

        $($(".userDepartment ul li")[2]).removeClass();
    } else {
        $($(".userDepartment ul li")[2]).attr("class", "skillsDisables");
    }
    //后期组
    if (point2.pointNum > 4 || point3.pointNum > 4 > 4 || point4.pointNum > 4 > 4 || $(
            ".pointLiterature").text() > 4) {

        $($(".userDepartment ul li")[3]).removeClass();
    } else {
        $($(".userDepartment ul li")[3]).attr("class", "skillsDisables");
    }
    //文学组
    if (point6.pointNum > 4) {

        $($(".userDepartment ul li")[4]).removeClass();
    } else {
        $($(".userDepartment ul li")[4]).attr("class", "skillsDisables");
    }
    //建筑组
    if (point5.pointNum > 4) {

        $($(".userDepartment ul li")[5]).removeClass();
    } else {
        $($(".userDepartment ul li")[5]).attr("class", "skillsDisables");
    }
}


//选择偏执
$(".userDepartment ul").on("click", "li", function () {
    if ($(this).hasClass("skillsDisables")) {
        return 0;
    }
    $(".userDepartment ul li").removeClass("departmentCheck");
    $(this).addClass("departmentCheck");
    $(".userDepartmentText").text($(this).text())
    switch ($(".userDepartmentText").text()) {
        case "美术组":
            Card1 = "SA";
            break;
        case "模型组":
            Card1 = "AA";
            break;
        case "渲染组":
            Card1 = "AA";
            break;
        case "后期组":
            Card1 = "CA";
            break;
        case "文学组":
            Card1 = "EA";
            break;
        case "建筑组":
            Card1 = "EA";
            break;
        default:
    }
    userCardReload();
})

//选择负担
$(".userAbility .userAbilityList ul").on("click", ".userAbilityLi", function () {
    if ($(this).hasClass("userAbilityCheck")) {
        $(this).removeClass("userAbilityCheck")
    } else {
        $(this).addClass("userAbilityCheck")
    }
})

//自定义负担
$(".userAbilityAdd").click(function () {
    $(".userAbilityAdd").before('<li class="AbilityAddText"><input type="text" maxlength="7"/></li>');
    $(".AbilityAddText input").focus();
    var addLen = document.querySelectorAll(".userAbilityList ul .userAbilityAddLi");
    if (AbilityNum >= 3) {
        $(".userAbilityAdd").fadeOut(0);
        return;
    }
});

//自定义负担 确认后
//失去焦点
$(".userAbility").on("blur", ".AbilityAddText input", function () {
    var type = $(".AbilityAddText input").val();
    if (String(type).length == 0 || AbilityNum >= 4) {
        $(".AbilityAddText").remove();
        return 0;
    } else {
        var type = String($(".AbilityAddText input").val());
        $(".userAbilityAdd").before('<li class="userAbilityAddLi">' + type + '</li>');
        $("userAbilityAddLi").attr("class", "userAbilityAddLi");
        $(".AbilityAddText").remove();
        AbilityNum++;
    }
})
//回车确认
$(".userAbility").keydown(function (e) {
    if (e.keyCode == 13) {
        $(".AbilityAddText").remove();
    }
});

//自定义负担 取消选择
$(".userAbility").on("click", ".userAbilityAddLi", function () {
    $(this).remove();
    var addLen = document.querySelectorAll(".userAbilityList ul .userAbilityAddLi");
    AbilityNum--;
    if (AbilityNum <= 3) {
        $(".userAbilityAdd").fadeIn(0);
    }
})

//UI动效

//负担选择动效
$(".userAbility .userAbilityList ul li").not("userAbilityCheck").hover(function () {
    $(this).addClass("userAbilityHover");
}, function () {
    $(this).removeClass("userAbilityHover");
})