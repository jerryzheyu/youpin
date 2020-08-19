import Vue from 'vue'
import Vuex from 'vuex'
import { login, getUserInfo } from '../api/list';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    shop_cart: JSON.parse(localStorage.getItem('shop_cart_info')) || [],
    height: '',
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || []
  },
  getters: {
    all_count: state => {
      // if(state.shop_cart==undefined||state.shop_cart==[])return
      let total =''
      state.shop_cart.forEach(item => total = +total + item.num)
      return total
      //  return state.shop_cart.reduce((x,y)=>x.num+y.num,0)
    },

  },
  mutations: {
    innerHeight: (state, h) => {
      state.height = h
    },
    TOKEN(state, payload) {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    USER_INFO(state, payload) {
      state.userInfo = payload
      localStorage.setItem('userInfo', JSON.stringify(payload))
    },
    DEL_INFO(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token')
    },
    ADD_GOODS_CART(state, {
      id,
      num,
      good_name,
      good_des,
      price,
    }) {

      let goods = state.shop_cart

      if (goods.length !== 0) {

        let index = goods.findIndex(item => item.id == id)
        if (index !== -1) {
          goods[index].num++
        } else {
          goods.push({
            id,
            num,
            good_name,
            good_des,
            price,
            checked: true
          })
        }
      } else {
        goods.push({
          id,
          num,
          good_name,
          good_des,
          price,
          checked: true
        })
      }
      state.shop_cart = goods
      localStorage.setItem('shop_cart_info', JSON.stringify(state.shop_cart))
    },
    SELECT_ALL(state, isAll) {
      state.shop_cart.forEach(item => {
        item.checked = isAll
      })
    },
    DEL_GOODS_CART(state, isAll) {
      if (isAll) {
        state.shop_cart = []
        localStorage.setItem('shop_cart_info', JSON.stringify(state.shop_cart))
      } else {
        state.shop_cart.forEach((item, index) => {
          if (item.checked) {
            state.shop_cart.splice(index, 1)
          }
        })
        localStorage.setItem('shop_cart_info', JSON.stringify(state.shop_cart))
      }

    },

    ADD_ADDRESS(state, payload) {
      state.shippingAddress = [...state.shippingAddress, payload]
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },
    DEL_ADRESS(state, id) {
      state.shippingAddress = state.shippingAddress.filter(item=>item.id !== id)
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },
    UPDATE_ADDRESS(state,payload){
      const index = state.shippingAddress.findIndex(item=>item.id==payload.id)
     
      state.shippingAddress.splice(index,1,payload)
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    }

  },
  actions: {
    async Login({ commit }, info) {
      let { data } = await login(info)
      commit('TOKEN', data.token)
    },
    async UserInfo({ commit }) {
      let { data } = await getUserInfo()
      commit('USER_INFO', data)
    },
    login_out({ commit }) {
      commit('DEL_INFO')
      router.push('/')
    },
    goods_cart({ commit }, data) {
      commit('ADD_GOODS_CART', data)
    }
  },
  modules: {
  }
})
