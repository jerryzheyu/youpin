<template>
  <div class="wrapper">
    <h2>欢迎登录小米有品</h2>

    <div class="forms">
      <van-form>
        <van-field
          v-model="formData.username"
          placeholder="admin"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.password"
          type="password"
          placeholder="密码同上"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <button @click="userLogin">登录 / 注册</button>
        </div>
      </van-form>
    </div>
    <div class="auth">
      <span>其他方式登录</span>
      <div class="authIcon">
        <img src alt />
        <img src alt />
        <img src alt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapState,mapMutations } from "vuex";
import {login} from '../api/list';
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
      ...mapState(['userInfo'])
  },
  components: {},
  methods: {

    ...mapActions(["Login","UserInfo"]),
    userLogin(){
        this.Login(this.formData)
        this.UserInfo()
        this.$router.back();
    },
   
    
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 26px;
  height: 100%;
  box-sizing: border-box;
  background: url("https://shop.io.mi-img.com/app/shop/img?id=shop_dfa89d9b977aa2f32346a1e2e3ecb838.png&w=750&h=1334");
  background-size: 100% auto;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    padding: 120px 0 10px;
    color: #666;
    margin-bottom: 50px;
  }
  .forms {
    width: 100%;
    .van-cell {
      line-height: 1rem;
    }
    button {
      border: none;
      outline: none;
      height: 35px;
      width: 100%;
      box-shadow: 0px 4px 2px #f1eadf;
      border-radius: 22px;
      color: #f1eadf;
      background: linear-gradient(to right, #e4bb7e, #d1a96e);
    }
  }
  .auth {
    margin-top: 130px;
    span {
      position: relative;
      &::before {
        position: absolute;
        top: 0;
        content: "";
        width: 40px;
        height: 5px;
        color: red;
      }
    }
  }
}
</style>