/*公共的文件*/
window.mjd = {};
// 判斷過渡之後的臨界值
mjd.transitionEnd = function (obj, callBack) {
    // 1. 判斷obj是否是對像
    if(typeof obj != 'object') return;
    
    // 2. 處理
    obj.addEventListener('transitionEnd', function (e) {
         callBack && callBack(e);
    });

    obj.addEventListener('webkitTransitionEnd', function (e) {
         callBack && callBack(e);
    });
}


/*
   封裝tap事件
 */
mjd.tap = function (obj, callback) {
    // 1.1 起始時間
    var startTime = 0;
    // 1.2 是否產生移動
    var isMove = false;

    // 2. 監聽常用的觸摸事件
    obj.addEventListener('touchstart', function () {
        // 2.1 獲取到當前的事件
        startTime = Date.now();
    });

    obj.addEventListener('touchmove', function () {
        isMove = true; // 產生移動
    });

    obj.addEventListener('touchend', function (e) {
        // 判斷是否產生tap
        if(Date.now() - startTime < 200 && !isMove){
            callback && callback(e);
        }

        // 置零
        startTime = 0;
        isMove = false;
    });
}