import Vue from 'vue'

// 金钱过滤 ¥xx.xx
Vue.filter('handle_price', (value) => {
    return '¥' + Number(value).toFixed(2);
})
Vue.filter('total_price', (value) => {
    return value*100;
})
Vue.filter('list_num', (value) => {
    if (value>10000) {
       return Number(value/10000).toFixed(2)+'万'
    }else{
        return value
    }
})