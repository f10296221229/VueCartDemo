"use strict";
new Vue({
    el: '#app',
    data: {
        // 購物車中的數據
        shopListArr: [],
        // 是否全選
        isSelectedAll: false,
        // 所有商品的總價格
        totalPrice: 0,
        // 是否隱藏刪除面板
        isHideDelPanel: true,
        // 當前要刪除的一個商品
        currentDelShop: {}
    },
    // 組件已經加載完畢, 請求網絡數據, 業務處理
    mounted(){
        // 請求本地的數據
        this.getLocalData();
    },

    // 過濾
    filters: {
        // 格式化金錢
        moneyFormat(money){
            return '¥' + money.toFixed(2);
        }
    },

    methods: {
        // 1. 請求本地的數據
        getLocalData() {
            this.$http.get('data/cart.json').then(response => {
                const res = response.body;
                if(res){
                    this.shopListArr = res.allShops.shopList;
                    console.log(this.shopListArr);
                }
            }, response => {
                alert('請求數據失敗!');
            });
        },

        // 2. 單個商品的加減
        singerShopPrice(shop, flag){
             if(flag){ // 加
                 shop.shopNumber += 1;
             }else { // 減
                 if(shop.shopNumber <= 1){
                     shop.shopNumber = 1;
                     return;
                 }
                 shop.shopNumber -= 1;
             }

            // 計算總價
            this.getAllShopPrice();
        },

        // 3. 選中所有的商品
        selectedAll(flag){
            // 3.1 總控制
            this.isSelectedAll = !flag;

            // 3.2 遍歷所有的商品數據
            this.shopListArr.forEach((value, index)=>{
                if(typeof value.checked === 'undefined'){
                    this.$set(value, 'checked', !flag);
                }else {
                    value.checked = !flag;
                }
            });

            // 3.3 計算總價格
            this.getAllShopPrice();
        },

        // 4. 計算商品的總價格
        getAllShopPrice(){
            let totalPrice = 0;
            // 4.1 遍歷所有的商品
            this.shopListArr.forEach((value, index)=>{
                // 判斷商品是否被選中
                if(value.checked){
                    totalPrice += value.shopPrice * value.shopNumber;
                }
            });

            this.totalPrice = totalPrice;
        },

        // 5. 單個商品的選中和取消
        singerShopSelected(shop){
            // 5.1 判斷有沒有這個屬性
            if(typeof shop.checked === 'undefined'){
                this.$set(shop, 'checked', true);
            }else {
                shop.checked = !shop.checked;
            }

            // 5.2 計算總價
            this.getAllShopPrice();

            // 5.3 判斷是否全選
            this.hasSelectedAll();
        },

        // 6. 判斷是否全選
        hasSelectedAll(){
            let flag = true;
            this.shopListArr.forEach((value, index)=>{
                if(!value.checked){
                    flag = false;
                }
            });
            this.isSelectedAll = flag;
        },

        // 7. 點擊垃圾簍
        clickTrash(shop){
            this.isHideDelPanel = false;
            this.currentDelShop = shop;
        },

        // 8. 刪除當前的商品
        delShop(){
           // 8.1 隱藏面板
            this.isHideDelPanel = true;
            const index = this.shopListArr.indexOf(this.currentDelShop);
            this.shopListArr.splice(index, 1);

            // 8.2 計算總價格
            this.getAllShopPrice();

        }

    }
});