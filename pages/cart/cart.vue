<template>
  <view>
    <!-- 购物车 -->
    <view class="cart-container" v-if="cart.length!==0">
      <!-- 收货地址区域 -->
      <shipping-address></shipping-address>
      <!-- 标题 -->
      <view class="title">
        <uni-icons type="shop" size="30"></uni-icons>
        <text class="title-text">购物车</text>
      </view>

      <!-- 商品列表 -->
      <uni-swipe-action>
        <block class="goods-list" v-for="(goods, index) in cart" :key="index">
          <!-- 商品项 -->
          <uni-swipe-action-item :right-options="options" @click="clickSwipeActionHandler($event, goods)">
            <goods-item :goods="goods" :isCart="true"></goods-item>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      
      <!-- 结算区域 -->
      <settle></settle>
    </view>
    
    <!-- 购物车为空时显示的区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/empty_cart.png" class="empty-img"></image>
      <text>购物车空空如也~</text>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from "vuex";
  import { mapMutations, mapState } from "vuex";
  import mixin from "../../mixins";

  export default {
    data() {
      return {
        options: [{
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        }],
      };
    },

    computed: {
      ...mapState("cart", ["cart"])
    },
    
    methods: {
      ...mapMutations('cart', {deleteGoods: "DELETEGOODS"}),

      // 点击滑动选项的事件
      clickSwipeActionHandler(e, goods) {
        if (e.content.text === "删除") {
          uni.showModal({
            content: "确认删除吗？",
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                this.deleteGoods(goods);
              }
            },
          });
        }
      },
    },

    mixins: [mixin],
  };
</script>

<style lang="less">
  .cart-container {
    padding-bottom: 100rpx;
    
    .title {
      height: 80rpx;
      display: flex;
      align-items: center;
      border-bottom: 1px solid lightgray;
      padding-left: 10rpx;

      .title-text {
        margin-left: 10rpx;
        font-size: 34rpx;
      }
    }

    .goods-list {
      display: flex;
      flex-direction: column;
    }
  }
  
  .empty-cart {
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 300rpx;
    
    .empty-img {
      width: 100px;
      height: 100px;
      margin-bottom: 30rpx;
    }
  }
</style>
