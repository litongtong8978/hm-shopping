<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
        {{ second === totalSecond?'获取验证码':`${second}秒后重新发送`}}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'// 挂载到Vue原型上，方便全局调用,不需要每个页面都引入 ,这里是按需引入,只引入Toast
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      smsCode: ''
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const res = await getPicCode()
      this.picKey = res.data.key
      this.picUrl = res.data.url
      // this.$toast.success('成功')// 方法挂载到Vue原型上，方便全局调用,不需要每个页面都引入
    },
    async getCode () {
      // console.log('获取验证码')
      if (!this.validFn()) {
        return
      }
      // 验证码和手机号均正确
      await getMsgCode(this.picCode, this.picKey, this.mobile)
      this.$toast('短信发送成功')
      this.timer = setInterval(() => {
        this.second--
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.timer = null// 顺序不能换
          this.second = this.totalSecond
        }
      }, 1000)
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (/^\d{6}&/.test(this.smsCode)) {
        this.$toast('请输入正确的短信码')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登陆成功')
      this.$router.push('/')
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      // if (/^\w{4}$/.test(this.picCode)) {
      //   this.$toast('请输入正确验证码')
      //   return false
      // }
      return true
    }
  },
  destroyed () {
    clearInterval(this.timer)// 离开页面销毁定时器
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;

  }
}
</style>
