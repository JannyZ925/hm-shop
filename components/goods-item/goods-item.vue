<template>
  <view class="goods-item-container">
    <radio color="#AA0000" :checked="goods.goods_state" v-if="isCart" @click="changeCheckState(goods)"/>
    <view class="goods-item" @click="goToDetail(goods)">
      <view class="goods-img">
        <image class="goods-img" :src="goods.goods_small_logo || defaultPic"></image>
      </view>
      <view class="goods-info">
        <text class="goods-name">{{ goods.goods_name }}</text>
        <view>
          <text class="goods-price">￥{{ goods.goods_price | toFixed}}</text>
          <uni-number-box v-if="isCart" :min="1" :value="goods.goods_count" @change="changeGoodsNum"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
  export default {
    name: "goods-item",
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },

    props: {
      goods: {
        type: Object,
        default: {}
      },
      // 是否为购物车页面,用于判断是否展示radio
      isCart: {
        type: Boolean,
        default: false
      }
    },

    filters: {
      // 把数字处理为两位小数的数字
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },

    methods: {
      ...mapMutations('cart', {changeGoodsState: 'CHANGEGOODSSTATE', chageGoodsNum: 'CHANGEGOODSCOUNT'}),
      
      // 列表项点击事件
      goToDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      },
      
      // radio点击事件
      changeCheckState(goods) {
        // 修改商品选中状态
        this.changeGoodsState(goods)
      },

      // 修改商品数量的事件
      changeGoodsNum(count) {
        this.goods.goods_count = count
        this.chageGoodsNum(this.goods)
      }
    }
  }
</script>

<style lang="less">
  .goods-item-container {
    display: flex;
    align-items: center;
    padding: 20rpx 10rpx;
    border-bottom: 1px solid lightgrey;
    
    .goods-item {
      display: flex;
    
      .goods-img {
        display: flex;
        margin-right: 10rpx;
    
        image {
          width: 250rpx;
          height: 250rpx;
          vertical-align: bottom;
        }
      }
    
      .goods-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    
        .goods-name {
          font-size: 30rpx
        }
        
        view {
          display: flex;
          justify-content: space-between;
          
          .goods-price {
            font-size: 40rpx;
            color: #AA0000;
          }
        }
      }
    }
  }
</style>
