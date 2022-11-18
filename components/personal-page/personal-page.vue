<template>
  <view class="personal-page">
    <!-- 用户信息区域 -->
    <view class="user-info">
      <image class="user-avatar" :src="userInfo.avatarUrl"></image>
      <text class="user-name">{{ userInfo.nickName }}</text>
    </view>

    <!-- 面板区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel1">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>

      <!-- 第二个面板 -->
      <view class="panel2">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item">
            <image class="item-img" src="/static/my-icons/icon1.png" mode=""></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image class="item-img" src="/static/my-icons/icon2.png" mode=""></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image class="item-img" src="/static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image class="item-img" src="/static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>

      <!-- 第三个面板 -->
      <view class="panel3">
        <view class="panel-item">
          <text>收货地址</text>
          <uni-icons type="forward" size="26"></uni-icons>
        </view>
        <view class="panel-item">
          <text>联系客服</text>
          <uni-icons type="forward" size="26"></uni-icons>
        </view>
        <view class="panel-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="forward" size="26"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { mapState } from 'vuex';
  export default {
    name: "user-info",
    data() {
      return {

      };
    },
    computed: {
      ...mapState("user", ['userInfo'])
    },
    methods: {
      ...mapMutations("user", { updateUserInfo: 'UPDATEUSERINFO', updateAddress: 'UPDATEADDRESS', updateToken: 'UPDATETOKEN'}),
      // 退出登录
      logout() {
        uni.showModal({
          title: '确认退出？',
          success: (res) => {
            if(res.confirm) {
              this.updateUserInfo({})
              this.updateAddress({})
              this.updateToken('')
            }
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .personal-page {
    height: 100vh;

    .user-info {
      padding: 100rpx 0;
      background-color: #AA0000;
      display: flex;
      flex-direction: column;
      align-items: center;

      .user-avatar {
        width: 180rpx;
        height: 180rpx;
        margin-bottom: 20rpx;
        border-radius: 50%;
        border: 2px solid white;
      }

      .user-name {
        font-size: 36rpx;
        color: white;
        font-weight: bolder;
      }
    }

    .panel-list {
      position: relative;
      top: -40rpx;

      .panel1,
      .panel2,
      .panel3 {
        width: 95%;
        margin: 0 auto 20rpx;
        padding: 20rpx 0;
        background-color: white;
        border-radius: 10rpx;

        .panel-body {
          display: flex;
        }
      }

      .panel1,
      .panel2 {
        .panel-body {
          justify-content: space-around;
          align-items: center;

          .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 30rpx;
          }
        }
      }

      .panel2 {
        .panel-title {
          margin: 0 20rpx 20rpx;
        }
        .panel-body {
          .panel-item {
            .item-img {
              width: 60rpx;
              height: 60rpx;
              margin-bottom: 10rpx;
            }
          }
        }
      }
      
      .panel3 {
        display: flex;
        flex-direction: column;
        
        .panel-item {
          display: flex;
          justify-content: space-between;
          padding: 0 20rpx;
          
          &:not(:last-child) {
            margin-bottom: 20rpx;
          }
        }
      }
    }
  }
</style>
