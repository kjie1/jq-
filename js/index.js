$('.shortcut .w').load('./components/shortcut.html')
$('.fs-1').load('./components/menu.html');
$('.sliderWrapper').load('./components/sliderWrapper.html', function (res) {
    $(this).swiper({
        contentList: $(this).find('.focus-item__core'),
        type: 'fade',
        width: 590,
        height: 470,
        spotPosition: 'left',
        spotSize: 10,
        spotColor: '#fff'
    })
})
// load 方法 是通过ajax 进行请求文件的   
// $.ajax({
//     url: './components/header.html',
//     type: 'get',
//     success: function(res) {
//         $('.header > .w').html(res);
//     }
// }) 
$('.header > .w').load('./components/header.html')


$('.silderBanner').load('./components/sliderBanner.html', function (res) {
    $(this).swiper({
        contentList: $(this).find('.focus-item__recommend'),
        type: 'fade',
        width: 190,
        height: 470,
        showSpots:false,
        showChangeBtn: 'hover',
        spotColor: '#fff'

    })
})

$('.fs-3 .user').load('./components/user.html');
$('.fs-3 .news').load('./components/news.html');


$('.seckill .seckill-content').find('.seckill-list').load('./components/seckilllist.html', function () {
    $(this).swiper({
        contentList: $(this).find('.seckill-list-item'),
        type: 'animate',
        autoChangeTime: 10000,
        showSpots: false,
        showChangeBtn: 'always',
        width: 800,
        height: 260

    })
});
$('.seckill .seckill-content').find('.seckill-brand').load('./components/seckillbrand.html', function () {
    $(this).swiper({
        contentList: $(this).find('.brand-item'),
        type: 'animate',
        autoChangeTime: 2000,
        isAuto: true,
        spotPosition: 'center',
        showChangeBtn: 'hide',
        width: 180,
        height: 240
    })
});


$('.fs-3 .service').load('./components/service.html')



var endTime = new Date('2021-03-05 22:00');
console.log(endTime);

var seckillTimer = setInterval(function () {
    var nowTime = new Date();
    // 剩余毫秒数
    var disTime = endTime.getTime() - nowTime.getTime();
    if (disTime < 0) {
        clearInterval(seckillTimer);
    } else {
        // 剩余小时数
        var hour = parseInt( disTime / 1000 / 60 / 60 );
        // 剩余分钟数
        var minutes = parseInt(disTime / 1000 / 60 % 60);
        // 剩余秒数
        var seconds = parseInt(disTime / 1000 % 60);
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        $('.timmer__unit--hour').text(hour);
        $('.timmer__unit--minute').text(minutes);
        $('.timmer__unit--second').text(seconds)


    }
}, 1000)