var dpr = window.devicePixelRatio;
console.log(dpr);
$('#meta').attr('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no');


// 根据设备宽度计算html的font-size
$(window).resize(function () {
    // console.log($(window).innerWidth());
    var w = $(window).innerWidth();
    $('html').css('fontSize', 100 / 639 * w);
});

var myUrl = "http://s.budejie.com/topic/list/zuixin/1/budejie-android-6.6.6/0-20.json";
myUrl = encodeURIComponent(myUrl);
$.ajax({
    url: "http://localhost:3000?myUrl=" + myUrl,
    dataType: "jsonp",
    success: function (r) {
        loadData(r);
    },
    error: function (e) {
        console.log(e);
    }
});

// 存放数据的数组
var dataArr = [];
// 播放器
var myPlayer;
// 解析数居
function loadData(data) {
    data = JSON.parse(data);
    if (data.list) {
        dataArr = data.list;
        // 展示数据
        showData();
    }

}

// 展示数据
function showData() {

    // 遍历数组
    for (var i = 0; i < dataArr.length; i++) {

        var obj = dataArr[i];
        // 创建li
        var li = $('<li/>');
        li.attr('index', i);
        // 创建h2
        var h2 = $('<h2/>');
        if (obj.text) {
            h2.html(obj.text);
        }
        // 拼接h2
        li.append(h2);
        $('ul').append(li);
        var liW = li.innerWidth();

        // console.log(obj.type);
        // 判断obj.type image, text, video, gif
        if (obj.type == "image") {

            // 创建img
            var img = $('<img/>');

            var imgW = obj.image.width;
            var imgH = obj.image.height;

            img.attr("src", obj.image.download_url[0]);
            img.attr("height", imgH * liW / imgW);

            // 拼接图片
            li.append(img);


        } else if (obj.type == "gif") {
            // 创建img
            var img = $('<img/>');
            img.attr('src', obj["gif"]["images"][0]);
            var imgW = obj.gif.width;
            var imgH = obj.gif.height;
            img.attr('height', imgH * liW / imgW);
            li.append(img);
        } else if (obj.type == "video") {
            // 创建video
            var video = $('<video />');
            var div = $('<div/>');
            div.append(video);
            li.append(div);
            var divW = div.innerWidth();

            var vW = obj.video.width;
            var vH = obj.video.height;
            $(this).attr("preload", "auto");
            video.attr('width', divW + 'px');
            video.attr('height', vH * divW / vW + 'px');
            video.attr('id', "video" + i);
            video.attr("controls", true);
            video.attr("class", "video-js");
            video.attr('src', obj.video.download[0]);
            video.attr('poster', obj.video.thumbnail_small[0]);
            console.log(video.attr('height'));
            console.log(video.attr('width'));

            // 给video添加点击事件
            video.click(function () {
                if (myPlayer) {
                    myPlayer.pause();
                }

                videojs($(this).attr('id')).ready(function () {
                    // $(this).attr('width', "500px");
                    myPlayer = this;
                    myPlayer.play();
                });

            });


        }






    }

}


