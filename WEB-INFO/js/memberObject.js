function objFuc(jsonType) {

    // 构造函数
    class eliteObject {
        constructor(objNum, objName, objJob, objBadge) {
            this.objNum = objNum;
            this.objName = objName;
            this.objJob = objJob;
            this.objBadge = objBadge;
        }
    }

    var objArr = $("#list_member_box ul li");


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

            listMod.innerHTML = "<div class='memberNum'><span></span><span></span></div><div class='memberName'><span></span><br><span class='state'></span></div>";
            $("#list_member_box ul").prepend(listMod);
        }

        // 重载所有展示框
        objArr = $("#list_member_box ul li");

        // 填充展示框
        for (var i in data) {

            let _object = new eliteObject(data[i].num, data[i].name, data[i].job, data[i].badge);
            //console.log((_object.objBadge).toString());
            if ((_object.objBadge).toString() == "资格失效") {
                console.log('1');
                $(objArr[i]).attr('border-left', '10px solid var(--state_off)');
                $($(objArr[i]).children()[1].children[1]).attr('color', 'var(--state_off)');
                $($(objArr[i]).children()[1].children[1]).text('合约失效');
            } else {
                console.log('2');
                $(objArr[i]).attr('border-left', '10px solid var(--state_on)');
                $($(objArr[i]).children()[1].children[1]).attr('color', 'var(--state_on)');
                $($(objArr[i]).children()[1].children[1]).text('合约生效中');
            }
            $($(objArr[i]).children()[0].children[0]).text(_object.objNum);
            $($(objArr[i]).children()[0].children[1]).text(_object.objJob);
            $($(objArr[i]).children()[1].children[0]).text(_object.objName);
        }

    }

}
