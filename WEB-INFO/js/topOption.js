console.log("true");
// 构造函数
class listUrl {
    constructor(objName, objUrl) {
        this.objName = objName;
        this.objUrl = objUrl;
    }
}
// 官网首页
let option_0 = new listUrl("官网首页", "Gchest-cn/index.html"); //首页
let option_1 = new listUrl("论坛主页", "https://www.mcbbs.net/group-1358-1.html"); //论坛首页

// 社团作品
let option_2 = new listUrl("菁英皮肤合集", "Gchest-cn/Elite/skinElite.html"); //皮肤
let option_3 = new listUrl("菁英模型预制", "Gchest-cn/Elite/modelElite.html"); //模型
let option_4 = new listUrl("优秀文字作品", "Gchest-cn/Elite/storyElite.html"); //文学
let option_5 = new listUrl("体素渲染作品", "Gchest-cn/Elite/picElite.html"); //渲染

// 社团成员
let option_6 = new listUrl("在职成员档案", "Gchest-cn/Member/member.html"); //首页

// 选项
var topList = $(".topPageOption ul li a");
var nameType = "none";
// 遍历填充
for (let i = 0; i < Array.prototype.slice.call(topList).length; i++) {
    $(topList[i]).attr("href", eval("option_" + i + ".objUrl"));
    $(topList[i]).text(eval("option_" + i + ".objName"));
}
