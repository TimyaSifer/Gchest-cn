function objFuc(jsonType) {

    // 构造函数
    class eliteObject {
        constructor(objName, objIntroduction, objCreate, objTime, objUrl) {
            this.objName = objName;
            this.objIntroduction = objIntroduction;
            this.objCreate = objCreate;
            this.objTime = objTime;
            this.objUrl = objUrl;
        }
    }

    var objArr = $("#list_document_box ul li");


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

            var listMod = document.createElement("li"); // 以 DOM 创建新元素

            listMod.innerHTML = "<div class='wordCard'><div class='wordTitle'></div><div class='Introduction'></div><span class='typeCreate pdfType'></span><span class='typeTime pdfType'></span><span class='typeUrl pdfType'>alphaImg</span></div>";
            $("#list_document_box ul").prepend(listMod);
        }

        // 重载所有展示框
        objArr = $("#list_document_box ul li");

        // 填充展示框
        for (var i in data) {

            let _object = new eliteObject(data[i].Name, data[i].Introduction, data[i].Create, data[i].Time, data[i].Url);
            $($(objArr[i]).children()[0].children[0]).text(_object.objName);
            $($(objArr[i]).children()[0].children[1]).text(_object.objIntroduction);
            $($(objArr[i]).children()[0].children[2]).text(_object.objCreate);
            $($(objArr[i]).children()[0].children[3]).text(_object.objTime);
            $($(objArr[i]).children()[0].children[4]).text(_object.objUrl);
        }

    }

}

$("#list_document_box ul").on('click', 'li', function () {
    $("#list_document_box ul li").removeClass("listCheck");
    $(this).addClass("listCheck");
    $(".wordContentBox .Init").fadeOut(50);
    $(".wordContentBox .contentTitle .wordTitle").text($($(this).children()[0].children[0]).text());
    $(".wordContentBox .contentTitle .wordInfor .wordCreate").text("作者:" + $($(this).children()[0].children[2]).text());
    $(".wordContentBox .contentTitle .wordInfor .wordTime").text("创建时间:" + $($(this).children()[0].children[3]).text());
    var typeUrl  = $($(this).children()[0].children[4]).text();
    // console.log(eval("../static/documentPDF/" + typeUrl + ".pdf"));
    $(".wordContentBox .media iframe").attr("src", ("../static/documentPDF/" + typeUrl + ".pdf"))
})
