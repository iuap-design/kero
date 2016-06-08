u.on(window, 'load', function() {
    document.querySelector('#p1')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);

    // 动态进度条卡片
    var closePro = function() {
        var progressDom = document.querySelector('.progress-card');
        progressDom.parentNode.removeChild(progressDom);
    };
    var closebtn1 = document.querySelector('.progress-close');
    var closebtn2 = document.querySelector('.progress-end .close');
    u.on(closebtn1, 'click', closePro);
    u.on(closebtn2, 'click', closePro);

    // 动态显示加载条的数据，默认总数据是1000
    var proRate = 1,
        proSum = 1000,
        proInfo;
    var proInfoNum = document.querySelector("#proInfoNum");
    var intervalNum = setInterval(function() {
        proInfo = parseInt(proRate * 0.01 * 1000) + '/1000';
        proInfoNum.innerHTML = proInfo;
        document.querySelector('#p5')['u.Progress'].setProgress(proRate);
        proRate = proRate + 5;
        if (proRate >= 100) {
            window.clearInterval(intervalNum);
            document.querySelector('#p5')['u.Progress'].setProgress(100);
            proInfoNum.innerHTML = '1000/1000';
        }
    }, 200);
})
