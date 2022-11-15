<template>
  <view>
    <shipping-address></shipping-address>
    
    <!-- 购物车 -->
    <view class="cart-container">
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
    </view>
  </view>
</template>

<script>
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
      ...mapState("cart", ["cart"]),
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
</style>
