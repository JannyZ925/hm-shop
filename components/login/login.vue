<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100"></uni-icons>
    <button class="login-button" type="default" @click="getUserProfile">一键登录</button>
    <text class="login-text">登录享更多权益</text>
  </view>
</template>

<script>
  import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
  export default {
    name: "login",
    data() {
      return {};
    },
    computed: {
      ...mapState("user", ['redirectInfo']),
    },

    methods: {
      ...mapMutations("user", { updateUserInfo: 'UPDATEUSERINFO', updateToken: 'UPDATETOKEN', updateRedirectInfo: 'UPDATEREDIRECTINFO' }),

      // 获取用户信息
      async getUserProfile() {
        await uni.getUserProfile({
          // desc 声明获取用户个人信息后的用途，不超过30个字符，为必填项
          desc: '获取用户信息用于登录',
          success: (res) => {
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: () => {
            uni.$showMsg("您取消了登录授权！")
          }
        })
      },

      // 获取token字符串
      async getToken(userInfo) {
        
        /* // 准备参数对象
        const query = {
          code: '',
          encryptedData: userInfo.encryptedData,
          iv: userInfo.iv,
          rawData: userInfo.rawData,
          signature: userInfo.signature
        } */
        
        await uni.login({
          success: (res) => {
            console.log(res);
            // query.code = res.code
          },
          fail: () => {
            return uni.$showMsg("登录失败！")
          }
        })
        
        /* // 获取 token
        // 这个api由于不是开发者,具有权限问题,无法获取token，复制老师的token即可
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
        this.updateToken(loginResult.message.token) */
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        uni.$showMsg('登录成功')
        
        // 如果重定向信息不为空则跳转到对应页面
        if(this.redirectInfo) {
          uni.switchTab({
            url: this.redirectInfo.from,
            success: () => {
              // 清空重定向信息
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .login-container {
    height: 380rpx;
    padding: 200rpx 40rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .login-button {
      width: 100%;
      color: white;
      background-color: #A00000;
      border-radius: 30rpx;
    }

    .login-text {
      font-size: 30rpx;
    }
  }
</style>
