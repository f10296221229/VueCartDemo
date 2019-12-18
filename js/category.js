/**
 * Created by a123 on 2017/2/17.
 */
window.onload = function () {
    leftCategory();
}

function leftCategory() {
    // 1. 拿到相應的標簽
    var parentDom = document.getElementsByClassName('category_main_left')[0];
    var childDom = parentDom.getElementsByClassName('category_main_left_con')[0];

    // 2. 求出父標簽和子標簽的高度
    var parentH = parentDom.offsetHeight;
    var childH = childDom.offsetHeight;
    // console.log(parentH, childH);

    // 3. 確定合理的滾動區間
    var maxY = 0; // 最大滾動區間
    var minY = -(childH - parentH);  // 最小滾動的區間
    // console.log(minY);

    // 4. 確定合理的緩衝區間
    var buffer = 150;

    //5. 設置過渡 清除過渡  改變位置
    var addTransition = function () {
        childDom.style.transition = 'all .2s ease';
        childDom.style.webkitTransition = 'all .2s ease';
    }

    var removeTransition = function () {
        childDom.style.transition = 'none';
        childDom.style.webkitTransition = 'none';
    }

    var changeTranslateY = function (y) {
        childDom.style.transform = 'translateY('+ y +'px)';
        childDom.style.webkitTransform = 'translateY('+ y +'px)';
    }

    // 6. 滑動起來
    var startY = 0, endY = 0, moveY=0;
    var currentY = 0;  // 時刻記錄當前的y的值
    // 6.1 開始觸摸
    childDom.addEventListener('touchstart', function (e) {
         // 6.1.1 獲取起始位置
         startY = e.touches[0].clientY;
    });
    // 6.2 觸摸移動
    childDom.addEventListener('touchmove', function (e) {
        // 6.2.1 獲取不斷移動產生的結束位置
        endY = e.touches[0].clientY;
        // 6.2.2 計算移動的距離
        moveY = startY - endY;
        // console.log(moveY);

        // 6.2.3 移動起來
        // 確定合理的滾動區間
        if((currentY-moveY)<(maxY + buffer) && (currentY-moveY) > (minY-buffer)){
            removeTransition();
            changeTranslateY(currentY - moveY);
        }

    });
    // 6.3 結束觸摸
    childDom.addEventListener('touchend', function (e) {
         // 6.3.1 結合緩衝判斷是否在合理滾動區間
         // 向下滾動
         if((currentY-moveY) > maxY){
             currentY = maxY;
             // 添加過渡,改變位置
             addTransition();
             changeTranslateY(currentY);
         }else if((currentY-moveY) < minY){
             currentY = minY;
             // 添加過渡,改變位置
             addTransition();
             changeTranslateY(currentY);
         }else { // 正常情況
             currentY = currentY - moveY;
         }

         // 6.3.2 清零
         startY = 0;
         endY = 0;
         moveY = 0;
    });

    // 7. 監聽tap事件
    var liList = childDom.getElementsByTagName('li');
    mjd.tap(childDom, function (e) {
        // 7.1 讓所有的li標簽的className清除
        for(var i=0; i<liList.length; i++){
            liList[i].className = '';
            // 去除對應的索引
            liList[i].index = i;
        }

        // 7.2 讓當前的被選中
        var li = e.target.parentNode;
        li.className = 'current';

        // 7.3 求出滾動的距離
        var distanceY = - (li.index * 50);

        // 7.4 讓childDom在合理的區域滾動
        if(distanceY > minY){
            addTransition();
            changeTranslateY(distanceY);
            currentY = distanceY;
        }else {
            changeTranslateY(minY);
            currentY = minY;
        }

         // 7.5 模擬數據的加載
         var rightDom = document.getElementsByClassName('category_main_right')[0];
         rightDom.style.transition = 'all .3s ease';
         rightDom.style.webkitTransition = 'all .3s ease';
         rightDom.style.opacity = 0;
         setTimeout(function () {
             rightDom.style.opacity = 1;
         }, 300);
    });


}