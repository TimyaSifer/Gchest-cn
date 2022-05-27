function objFuc(jsonType) {

    // 构造函数
    class picObject {
        constructor(objUrl, objImg, objCreate,) {
            this.objUrl = objUrl;
            this.objImg = objImg;
            this.objCreate = objCreate;
        }
    }

    var objArr = $("#show_box_elite ul a");


    // 自动填充json对象
    var Ajax = function () {
        $.getJSON(jsonType, function (data) {
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
                "<li><div><img onerror=this.src='../static/showUndefined.png'></div><div><div>标题</div><span>作者</span><span class='skinTime'>日期</span></div></li>";
            $("#show_box_elite ul").prepend(listMod);
        }

        // 重载所有展示框
        objArr = $("#show_box_elite ul a");

        // 填充展示框
        for (var i in data) {

            let _object = new eliteObject(data[i].url, data[i].skinName, data[i].skinImg, data[i].skinCreate, data[i]
                .skinTime);
            $(objArr[i]).attr('target', "_blank");
            $(objArr[i]).attr('href', _object.objUrl);
            $(objArr[i]).attr('title', _object.objName);
            $($(objArr[i]).children()[0].children[0].children[0]).attr('src', _object.objImg);
            $($(objArr[i]).children()[0].children[1].children[0]).text(_object.objName);
            $($(objArr[i]).children()[0].children[1].children[1]).text("作者：" + _object.objCreate);
            $($(objArr[i]).children()[0].children[1].children[2]).text(_object.objTime);
        }

    }

}
