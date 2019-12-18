/**
 * Created by a123 on 2017/2/19.
 */
window.onload = function () {
    deleteProduct();
}

/*
  刪除商品 
 */
function deleteProduct() {
    // 1. 獲取需要的元素
    var panel = document.getElementsByClassName('panel')[0];
    var panelContent = panel.getElementsByClassName('panel_content')[0];
    var trashes = document.getElementsByClassName('shop_deal_right');

    var checkBoxs = document.getElementsByClassName('cart_check_box');
    // console.log(trashes);
    // 2. 監聽點擊
    var up; // 上面的蓋子
    for(var i=0; i<trashes.length; i++){
        (function (index) {
            mjd.tap(trashes[i], function (e) {
                 // console.log(trashes[index]);
                 // console.log(e.target.parentNode);
                 // 2.1 實現垃圾簍翻蓋
                 // 2.1.1 取到蓋子
                 up = trashes[index].firstElementChild;
                 // console.log(up);

                 // 2.1.2 加過渡
                 up.style.transition = 'all .2s ease';
                 up.style.webkitTransition = 'all .2s ease';

                 // 2.1.3 實現動畫
                 up.style.transformOrigin = '0 5px';
                 up.style.webkitTransformOrigin = '0 5px';

                 up.style.transform = 'rotate(-45deg)';
                 up.style.webkitTransform = 'rotate(-45deg)';

                 // 2.1 彈出面板
                 panel.style.display = 'block';
                 panelContent.className = 'panel_content jump'

            });
        })(i);
    }

    // // 3. 點擊取消按鈕
    // var cancel = panelContent.getElementsByClassName('cancel')[0];
    // mjd.tap(cancel, function (e) {
    //     panel.style.display = 'none';
    //
    //     up.style.transform = 'none';
    //     up.style.webkitTransform = 'none';
    // })
    //
    // // 4. 復選框選中和取消
    // for(var i=0; i<checkBoxs.length; i++){
    //
    //         mjd.tap(checkBoxs[i], function (e) {
    //              if(e.target.hasAttribute('checked')){
    //                  e.target.removeAttribute('checked');
    //              }else {
    //                  e.target.setAttribute('checked', '');
    //              }
    //         });
    // }
}