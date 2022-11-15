<template>
  <view>
    <!-- 选择收货地址按钮区域，address为空时显示 -->
    <view v-if="JSON.stringify(address)==='{}'" class="choose-address-container">
      <button type="primary" size="mini" style="background-color: #AA0000;" @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>

    <!-- 收货地址区域，address不为空时显示 -->
    <view class="shipping-address" v-else>
      <!-- 地址信息 -->
      <view class="address-info">
        <text class="user-name">收货人：{{ address.userName }}</text>
        <text class="user-phone">电话：{{ address.telNumber }}</text>
        <text class="user-address">收货地址：{{ addstr }}</text>
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
      async chooseAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        console.log('222');

        // 2. 用户成功的选择了收货地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log('333');
          // 为 data 里面的收货地址对象赋值
          this.address = succ
        }
      }
    },

    computed: {
      // 收货详细地址的计算属性
      addstr() {
        if (!this.address.provinceName) return ''

        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
    },
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
