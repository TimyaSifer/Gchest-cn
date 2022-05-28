function objFuc(jsonType) {

    // 构造函数
    class eliteObject {
        constructor(objUrl, objCreate, objTime) {
            this.objUrl = objUrl;
            this.objCreate = objCreate;
            this.objTime = objTime;
        }
    }

    var objArr = $("#show_box_elite ul li");


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

            listMod.innerHTML = "<div><img></div><div><span>作者</span><span class='skinTime'>创作时间</span></div>";
            $("#show_box_elite ul").prepend(listMod);
        }

        // 重载所有展示框
        objArr = $("#show_box_elite ul li");

        // 填充展示框
        for (var i in data) {

            let _object = new eliteObject(data[i].url, data[i].Create, data[i].Time);
            $($(objArr[i]).children()[0].children[0]).attr('src', _object.objUrl);
            $($(objArr[i]).children()[1].children[0]).text(_object.objCreate);
            $($(objArr[i]).children()[1].children[1]).text(_object.objTime);
        }

    }

}

// 初始化
$("#picMask").fadeOut(0);
// 点击查看大图
$("#show_box_elite ul").on("click","li div img", function () {
    $("#bigPic div img").attr("src", this.src);
    $("#picMask").fadeIn(300);
})
//点击按钮或遮罩关闭大图
$("#picMask,#picMask .picDrag,#bigPic div .btnQuin").click(function () {
    $("#picMask").fadeOut(300);
    setTimeout(function () {
        $("#picMask .picDrag").css({
            "left": "0px",
            "top": "0px"
        });
        $("#bigPic div img").css("zoom", "100%");
    }, 300)
})
$("#bigPic,#bigPic div img,#bigPic div").click(function (e) {
    e.stopPropagation();
})

// 滚轮缩放方法
$(function () {
    function zoomImg(o) {
        var zoom = parseInt(o.style.zoom, 10) || 100;
        zoom += event.wheelDelta / 5; //可适合修改
        if (zoom > 0) o.style.zoom = zoom + '%';
    }
    $(document).ready(function () {
        $("img").bind("mousewheel",
            function () {
                zoomImg(this);
                return false;
            });
    });
})


// 鼠标拖拽方法
$('#picMask .picDrag').mousedown(function (event) {
    deltax = event.clientX - $(this).offset().left
    deltay = event.clientY - $(this).offset().top
    $(document).bind('mousemove', start)
    $(document).bind('mouseup', end)
    return false
})

function start(event) {
    x = event.clientX - deltax
    y = event.clientY - deltay
    $('#picMask .picDrag').css({
        'left': x + 'px',
        'top': y + 'px'
    })
    return false
}

function end(event) {
    $(this).unbind('mousemove')
    $(this).unbind('mouseup')
}
