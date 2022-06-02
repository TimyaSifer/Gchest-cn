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
$("ul li .skillsPoint").on("click", ".pointAdd", function () {
    var type = $(this).parent().children()[1];
    if (type.innerText >= 0 && $(".inforSkillsTitleText").text() <= skillsType && $(
            ".inforSkillsTitleText").text() > 0) {
        type.innerText = type.innerText * 1 + 1;
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
    userCardReload();
})

//偏执开关
function userLevelFuc() {
    //美术组
    if ($(".pointSkin").text() > 4 || $(".pointAnaphase").text() > 4 || $(".pointDraw").text() > 4) {

        $($(".userDepartment ul li")[0]).removeClass();
    } else {
        $($(".userDepartment ul li")[0]).attr("class", "skillsDisables");
    }
    //模型组
    if ($(".pointModeling").text() > 4) {

        $($(".userDepartment ul li")[1]).removeClass();
    } else {
        $($(".userDepartment ul li")[1]).attr("class", "skillsDisables");
    }
    //渲染组
    if ($(".pointRender").text() > 4) {

        $($(".userDepartment ul li")[2]).removeClass();
    } else {
        $($(".userDepartment ul li")[2]).attr("class", "skillsDisables");
    }
    //后期组
    if ($(".pointRender").text() > 4 || $(".pointAnaphase").text() > 4 || $(".pointDraw").text() > 4 || $(
            ".pointLiterature").text() > 4) {

        $($(".userDepartment ul li")[3]).removeClass();
    } else {
        $($(".userDepartment ul li")[3]).attr("class", "skillsDisables");
    }
    //文学组
    if ($(".pointLiterature").text() > 4) {

        $($(".userDepartment ul li")[4]).removeClass();
    } else {
        $($(".userDepartment ul li")[4]).attr("class", "skillsDisables");
    }
    //建筑组
    if ($(".pointBuild").text() > 4) {

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
    if (addLen.length >= 3) {
        $(".userAbilityAdd").fadeOut(0);
        return;
    }
});

//自定义负担 确认后
//失去焦点
$(".userAbility").on("blur", ".AbilityAddText input", function () {
    var type = $(".AbilityAddText input").val();
    if (String(type).length == 0) {
        $(".AbilityAddText").remove();
        return 0;
    } else {
        var type = String($(".AbilityAddText input").val());
        $(".userAbilityAdd").before('<li class="userAbilityAddLi">' + type + '</li>');
        $("userAbilityAddLi").attr("class", "userAbilityAddLi");
        $(".AbilityAddText").remove();
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
    if (addLen.length <= 3) {
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