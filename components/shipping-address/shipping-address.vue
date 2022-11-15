<template>
  <view>
    <!-- 选择收货地址按钮区域，address为空时显示 -->
    <view v-if="JSON.stringify(address)==='{}'" class="choose-address-container">
      <button 
        type="primary"
        size="mini" 
        style="background-color: #AA0000;"
        @click="chooseLocation"
      >
      请选择收货地址+
      </button>
    </view>

    <!-- 收货地址区域，address不为空时显示 -->
    <view class="shipping-address" v-else>
      <!-- 地址信息 -->
      <view class="address-info">
        <text class="user-name">收货人：{{ address.userName }}</text>
        <text class="user-phone">电话：{{ address.userPhone }}</text>
        <text class="user-address">收货地址：{{ address.userAddress }}</text>
      </view>
      <!-- 展开图标 -->
      <uni-icons type="forward" size="30"></uni-icons>
    </view>

    <!-- 边框线 -->
    <image class="cart-border" src="/static/cart_border@2x.png" />
  </view>
</template>

<script>
  export default {
    name: "shipping-address",
    props: {},
    data() {
      return {
        address: {
          // userName: '张三',
          // userPhone: '15573891643',
          // userAddress: '广东省广州市海珠新港中路397号'
        }
      }
    },
    computed: {},
    methods: {
      // 选择收货地址
      chooseLocation() {
        uni.chooseLocation({
          success: (res) => {
            console.log(res.name);
            console.log(res.address);
          }
        })
      }
    },
    watch: {},

    // 组件周期函数--监听组件挂载完毕
    mounted() {},
    // 组件周期函数--监听组件数据更新之前
    beforeUpdate() {},
    // 组件周期函数--监听组件数据更新之后
    updated() {},
    // 组件周期函数--监听组件激活(显示)
    activated() {},
    // 组件周期函数--监听组件停用(隐藏)
    deactivated() {},
    // 组件周期函数--监听组件销毁之前
    beforeDestroy() {}
  }
</script>

<style lang="less">
  .choose-address-container {
    height: 200rpx;
    display: flex;
    align-items: center;

    button {
      margin: auto;
    }
  }

  .shipping-address,
  .address-info {
    display: flex;
    justify-content: space-between;
  }

  .shipping-address {
    align-items: center;
    padding: 20rpx 10rpx;

    .address-info {
      flex-wrap: wrap;
      width: 90%;

      text {
        font-size: 32rpx;
        line-height: 60rpx;
      }
    }
  }


  // 边框线
  .cart-border {
    width: 100%;
    height: 10rpx;
  }
</style>
