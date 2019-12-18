/**
 * Created by a123 on 2017/2/16.
 */
window.onload = function () {
    changeNavBarColor();
    secondKill();
    changeBanner();
};

window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    }, 200);
}

/*
  改變導航條的顏色 
*/
function changeNavBarColor() {
    // 1. 獲取導航條和焦點圖
    var headerBox = document.getElementsByClassName('jd_header_box')[0];
    var banner = document.getElementsByClassName('jd_banner')[0];

    // 2. 求出焦點圖的高度
    var bannerH = banner.offsetHeight;

    window.onscroll = function () {
        // 3. 求出頁面偏離頭部的高度
        var scrollTopH = document.body.scrollTop;

        // 4. 判斷
        var opt = 0;
        if(scrollTopH <= bannerH){
            // 4.0 求出透明度
            opt = scrollTopH / bannerH * 0.85;

        }else {
            opt = 0.85;
        }
        // 4.1 設置顏色漸變
        headerBox.style.background = 'rgba(201, 21, 35, '+ opt +')';
    }
}

/*
   秒殺倒計時
*/
function secondKill() {
    // 1. 獲取秒殺標簽
    var sencondTime = document.getElementsByClassName('s_kill_time')[0];
    var spans = sencondTime.getElementsByTagName('span');

    // 2. 設置定時器
    var timer = null, time = 8 * 60 * 60;
    timer = setInterval(function () {
        /* 出錯點  */
        time--;
        // 2.1 清除定時器
        if(time < 0){
            clearInterval(timer);
        }

        // 2.2 拆分成時分秒
        var h = Math.floor(time / (60 * 60));
        var m = Math.floor(time % (60 * 60) / 60);
        var s = time % 60;

        // 2.3 把內容顯示到標簽上(出錯點)
        spans[0].innerHTML = h >= 10 ? Math.floor(h/10): 0;
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = m >= 10 ? Math.floor(m/10): 0;
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = s >= 10 ? Math.floor(s/10): 0;
        spans[7].innerHTML = s % 10;

    }, 1000);
}

/*
  首頁輪播圖
 */
function changeBanner() {
    // 1.獲取需要的標簽
    var banner = document.getElementsByClassName('jd_banner')[0];
    var bannerW = banner.offsetWidth;
    var imageBox = banner.getElementsByTagName('ul')[0]; // 圖片的盒子
    var indicatorBox = banner.getElementsByTagName('ol')[0]; // 指示器的盒子
    var allPoints = indicatorBox.getElementsByTagName('li'); // 所有的圓點

    // 2. 設置過渡效果 清除過渡效果 位置改變
    var addTransition = function () {
        imageBox.style.transition = 'all .2s ease';
        imageBox.style.webkitTransition = 'all .2s ease'; // 兼容手機端老webkit瀏覽器內核
    }

    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none'; // 兼容手機端老webkit瀏覽器內核
    }

    var changeTranslateX = function (x) {
        imageBox.style.transform = 'translateX(' + x + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    // 3. 讓圖片盒子滾動起來
    var index = 1;  // 全局的索引
    var timer = null;
    timer = setInterval(scrollImg, 1000);
    function scrollImg() {
        index++;
        // 設置過渡效果
        addTransition();
        // 改變位置
        changeTranslateX(-index * bannerW);
    }


    // 4. 當圖片過渡結束後,臨界值
    /*
    imageBox.addEventListener('transitionEnd',function () {
         // 4.1 判斷最大最小索引
         if(index >= 9){ // 最大值
             index = 1;
         } else if(index <=0){
             index = 8;
         }

         // 4.2 清除過渡
         removeTransition();
         changeTranslateX(-index * bannerW);

         // 4.3 改變指示器
         changePoints();
    });

    imageBox.addEventListener('webkitTransitionEnd',function () {
        // 4.1 判斷最大最小索引
        if(index >= 9){ // 最大值
            index = 1;
        } else if(index <=0){
            index = 8;
        }

        // 4.2 清除過渡
        removeTransition();
        changeTranslateX(-index * bannerW);

        // 4.3 改變指示器
        changePoints();
    });
    */
    mjd.transitionEnd(imageBox, function (e) {
            // 4.1 判斷最大最小索引
            if(index >= 9){ // 最大值
                index = 1;
            } else if(index <=0){
                index = 8;
            }

            // 4.2 清除過渡
            removeTransition();
            changeTranslateX(-index * bannerW);

            // 4.3 改變指示器
            changePoints();
    })


    // 5. 讓點跟著滾動
    var changePoints = function () {
        // 5.1 清除圓點上的默認選中樣式
        for(var i=0; i<allPoints.length; i++){
            allPoints[i].className = '';
        }

        // 5.2 讓指示器的索引和圖片的索引保持一致
        var pointIndex = index;
        if(pointIndex >= 9){
            pointIndex = 1;
        }else if(index <=0){
            pointIndex = 8;
        }

        // 5.3 讓當前的索引對應的指示器被選中  <出錯點:pointIndex-1>
        allPoints[pointIndex - 1].className = 'current';
    }

    // 6. 監聽手勢滑動
    var startX = 0; // 起始觸摸水平位置
    var endX = 0;  // 結束觸摸水平位置
    var distanceX = 0; // 手指滑動的距離


    /*
       出錯點: touch 寫成了 tounch 
    */
    // 6.1  手指觸碰屏幕的時候觸發
    imageBox.addEventListener('touchstart', function (e) {
          // 6.1.1 清除定時器
          clearInterval(timer);
          // 6.1.2 獲取起始位置
          startX = e.touches[0].clientX;
    });

    // 6.2 手指在屏幕中滑動時候連續觸發。
    imageBox.addEventListener('touchmove', function (e) {
         // 6.2.1 阻止默認的滾動事件
         e.preventDefault();
         // 6.2.2 獲取結束位置
         endX = e.touches[0].clientX;
         // 6.2.3 獲取到滑動的距離
         distanceX = startX - endX;
         // console.log(distanceX);
         // 6.2.4 清除過渡效果,改變位置
         removeTransition();
         changeTranslateX(-index*bannerW - distanceX);
    });

    // 6.3 當手指離開屏幕的時候觸發
    imageBox.addEventListener('touchend', function () {
         // 6.3.1 判斷滑動的距離是否超出了1/3  && 必須處於滑動狀態
         if(Math.abs(distanceX) > 1/3 * bannerW && endX != 0) {  /*--出錯點 endX != 0 endX > 0--*/
             // 判斷
             if (distanceX > 0) {
                 index++
             } else if (distanceX < 0) {
                 index--;
             }
         }

          // 添加過渡效果
          addTransition();
          // 改變位置
          changeTranslateX(-index*bannerW);  /*出錯點: bannerW --> banner*/

          // 重新開啟定時器
          timer = setInterval(scrollImg, 1000);

          // 清除記錄值(滑動結束,下次滑動應該是新的值)
          startX = 0;
          endX = 0;
          distanceX = 0;
    });




}