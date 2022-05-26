// 构造函数
class eliteObject {
    constructor(objUrl, objName, objImg, objCreate, objTime) {
        this.objUrl = objUrl;
        this.objName = objName;
        this.objImg = objImg;
        this.objCreate = objCreate;
        this.objTime = objTime;
    }
}

var objArr = $("#show_box_elite ul a");


// 自动填充json对象
var Ajax = function (type) {
    $.getJSON(type, function (data) {
        displayData(data); //传入一个函数
    });
}();


var displayData = function (data) {
    // 计算json对象长度
    var objLenght = Object.keys(data);

    var objLen = 0;
    for (var i in data) {
        objLen++;
    }

    // 添加展示框元素
    for (let i = 0; i < objLen; i++) {

        var listMod = document.createElement("a"); // 以 DOM 创建新元素

        listMod.innerHTML =
            "<li><div><img onerror='this.src=../static/showUndefined.png'></div><div><div>标题</div><span>作者</span><span class='skinTime'>日期</span></div></li>";
        $("#show_box_elite ul").prepend(listMod);
    }

    // 重载所有展示框
    objArr = $("#show_box_elite ul a");

    // 填充展示框
    for (var i in data) {

        let _object = new <!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>菁英皮肤合集</title>

    <link rel="shortcut icon" href="../static/pageIco.ico">

    <script type="text/javascript" src="../WEB-INFO/js/jquery-3.5.1.js"></script>
    <script type="text/javascript" src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>

    <link rel="stylesheet" href="../WEB-INFO/pages/HomeFormCss.css">
    <link rel="stylesheet" href="../WEB-INFO/pages/skinCss.css">

    <script type="text/javascript" src="../WEB-INFO/js/homeFormJsCode.js"></script>


</head>

<body>
    <!-- 顶部栏 -->
    <div id="topPage">
        <!-- logo -->
        <a href="../index.html">
            <div class="topLogo"></div>
            <span class="topTitle">黄金之匣 美术工作社</span>
        </a>

        <ul class="topOptions" style="z-index: 10;">
            <li>官网首页</li>
            <li>社团作品</li>
            <li>社团成员</li>
            <li>成员功能</li>
            <li>技术文档</li>
            <li>关于社团</li>

            <!-- 顶部栏下拉框 -->
            <div class="topPageOption">
                <!-- 列 1 -->
                <ul>
                    <li><a href="../index.html">官网首页</a></li>
                    <li><a href="https://www.mcbbs.net/group-1358-1.html" target="_blank">论坛主页</a></li>
                </ul>
                <!-- 列 2 -->
                <ul>
                    <li><a onclick="location.reload();">菁英皮肤合集</a></li>
                    <li><a href="modelElite.html">菁英模型预制</a></li>
                    <li><a href="storyElite.html">优秀文字作品</a></li>
                    <li>体素渲染作品</li>
                </ul>
                <!-- 列 3 -->
                <ul>
                    <li>在职成员档案</li>
                    <li>管理组档案</li>
                </ul>
                <!-- 列 4 -->
                <ul>
                    <li>人事档案提交</li>
                </ul>
                <!-- 列 5 -->
                <ul>
                    <li>技术分享</li>
                </ul>
                <!-- 列 6 -->
                <ul>
                    <li>社团简介</li>
                    <li>联系我们</li>
                    <li>定制服务</li>
                </ul>
            </div>
        </ul>
    </div>

    <!-- 标题 -->
    <div id="show_title">
        菁英 皮肤作品档案
    </div>

    <!-- 内容栏 -->
    <div id="show_box_elite">
        <ul>
        </ul>
    </div>

</body>

<script>

    // 构造函数
class eliteObject {
    constructor(objUrl, objName, objImg, objCreate, objTime) {
        this.objUrl = objUrl;
        this.objName = objName;
        this.objImg = objImg;
        this.objCreate = objCreate;
        this.objTime = objTime;
    }
}

var objArr = $("#show_box_elite ul a");


// 自动填充json对象
var Ajax = function () {
    $.getJSON("../static/listSkin.json", function (data) {
        displayData(data); //传入一个函数
    });
}();


var displayData = function (data) {
    // 计算json对象长度
    var objLenght = Object.keys(data);

    var objLen = 0;
    for (var i in data) {
        objLen++;
    }

    // 添加展示框元素
    for (let i = 0; i < objLen; i++) {

        var listMod = document.createElement("a"); // 以 DOM 创建新元素

        listMod.innerHTML =
            "<li><div><img onerror='this.src=../static/showUndefined.png'></div><div><div>标题</div><span>作者</span><span class='skinTime'>日期</span></div></li>";
        $("#show_box_elite ul").prepend(listMod);
    }

    // 重载所有展示框
    objArr = $("#show_box_elite ul a");

    // 填充展示框
    for (var i in data) {

        let _object = new eliteObject(data[i].url, data[i].skinName, data[i].skinImg, data[i].skinCreate, data[i]
            .skinTime);
        $(objArr[i]).attr('target', "_blank");
        $(objArr[i]).attr('href', _object.skinUrl);
        $(objArr[i]).attr('title', _object.skinName);
        $($(objArr[i]).children()[0].children[0].children[0]).attr('src', _object.skinImg);
        $($(objArr[i]).children()[0].children[1].children[0]).text(_object.skinName);
        $($(objArr[i]).children()[0].children[1].children[1]).text("作者：" + _object.skinCreate);
        $($(objArr[i]).children()[0].children[1].children[2]).text(_object.skinTime);
    }

}
</script>

</html>(data[i].url, data[i].skinName, data[i].skinImg, data[i].skinCreate, data[i]
            .skinTime);
        $(objArr[i]).attr('target', "_blank");
        $(objArr[i]).attr('href', _object.skinUrl);
        $(objArr[i]).attr('title', _object.skinName);
        $($(objArr[i]).children()[0].children[0].children[0]).attr('src', _object.skinImg);
        $($(objArr[i]).children()[0].children[1].children[0]).text(_object.skinName);
        $($(objArr[i]).children()[0].children[1].children[1]).text("作者：" + _object.skinCreate);
        $($(objArr[i]).children()[0].children[1].children[2]).text(_object.skinTime);
    }

}
