// 构造函数
class listUrl {
    constructor(objName, objUrl) {
        this.objName = objName;
        this.objUrl = objUrl;
    }
}
// 官网首页
let option_0 = new listUrl("官网首页", "index.html"); //首页
let option_1 = new listUrl("论坛主页", "https://www.mcbbs.net/group-1358-1.html"); //论坛首页

// 社团作品
let option_2 = new listUrl("菁英皮肤合集", "Elite/skinElite.html"); //皮肤
let option_3 = new listUrl("菁英模型预制", "Elite/modelElite.html"); //模型
let option_4 = new listUrl("优秀文字作品", "Elite/storyElite.html"); //文学
let option_5 = new listUrl("体素渲染作品", "Elite/picElite.html"); //渲染

// 社团成员
let option_6 = new listUrl("历届成员档案", "Member/member.html"); //历届成员
let option_7 = new listUrl("管理组档案", "Member/admin.html"); //管理组档案

// 成员功能
let option_8 = new listUrl("人事档案提交", "MemberFuc/submission.html"); //人事档案提交

// 技术文档
let option_9 = new listUrl("技术分享", "Technology/technology.html"); //技术分享

//关于我们
let option_10 = new listUrl("社团简介", "About/introduction.html"); //社团简介
let option_11 = new listUrl("联系我们", "About/contact.html"); //联系我们
let option_12 = new listUrl("定制服务", "About/business.html"); //定制服务

// 选项
var topList = $(".topPageOption ul li a");
var nameType = "none";
var urlType = "none";
// 遍历填充
for (let i = 0; i < Array.prototype.slice.call(topList).length; i++) {
    if (document.title == "黄金之匣 | 像素美术工作社") {
        $(topList[i]).attr("href", eval("option_" + i + ".objUrl"));
        $(topList[1]).attr("href", option_1.objUrl);
    } else {
        // console.log(eval("../option_" + i + ".objUrl"));
        urlType = eval("option_" + i + ".objUrl");
        $(topList[i]).attr("href", "../" + urlType);
        $(topList[1]).attr("href", option_1.objUrl);
        $(topList[1]).attr("href", option_1.objUrl);
    }

    $(topList[i]).text(eval("option_" + i + ".objName"));
}
