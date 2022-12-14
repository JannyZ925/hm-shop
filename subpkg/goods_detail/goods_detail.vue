<template>
  <view style="background-color: white;" v-if="goodsDetail.goods_price">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
      <swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
        <image :src="item.pics_big" @click="previewImage(index)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-container">
      <view class="goods-info">
        <text class="goods-price">￥{{ goodsDetail.goods_price }}</text>
        <text class="goods-name">{{ goodsDetail.goods_name }}</text>
        <text class="goods-carriage">快递：免运费</text>
      </view>
      <view class="store-up">
        <uni-icons type="star" size="30" color="gray"></uni-icons>
        <text>收藏</text>
      </view>
    </view>

    <!-- 商品详情信息 -->
    <view class="goods-detail">
      <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
    </view>

    <!-- 底部导航区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
import mixin from '../../mixins'

  export default {
    data() {
      return {
        // 商品信息
        goodsDetail: {},
        // 底部导航按钮
        options: [{
          icon: 'shop',
          text: '店铺',
          info: 0
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        }, {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    
    computed: {
      ...mapState('cart', ['cart'])
    },
    
    watch: {
      // 监听totalCount的变化,为商品详情页的购物车角标数字赋值
      totalCount: {
        immediate: true,
        handler(newVal) {
          const op = this.options.find(op => op.text === '购物车')
          op.info = newVal
        }
      }
    },
    
    methods: {
      ...mapMutations('cart', {addToCart: 'ADDTOCART'}),
      
      // 获取商品详情
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + goods_id)
        if (res.meta.status !== 200) return uni.$showMsg()
        /**
         * replace(/<img /g, '<img style="vertical-align: bottom;" ')解决图片底部有空隙的问题
         * replace(/webp/g, 'jpg') 解决 .webp 格式图片在 ios 设备上无法正常显示的问题
         */
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="vertical-align: bottom;" ').replace(/webp/g, 'jpg')
        this.goodsDetail = res.message
      },
      
      // 预览图片
      previewImage(index) {
        uni.previewImage({
          current: index,
          loop: true,
          urls: this.goodsDetail.pics.map(x => x.pics_big)
        })
      },
      
      // 点击底部的左侧按钮事件
      onClick(e) {
        if(e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      
      // 点击底部右侧的按钮事件
      buttonClick(e) {
        if(e.content.text === '加入购物车') {
          // 封装商品信息对象
          const goods = {
            goods_id: this.goodsDetail.goods_id,
            goods_name: this.goodsDetail.goods_name,
            goods_price: this.goodsDetail.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsDetail.goods_small_logo,
            goods_state: true //商品的勾选状态
          }
          // 将商品加入购物车
          this.addToCart(goods)
          // 弹出提示框
          uni.showToast({
            title: '添加成功！在购物车等亲~',
            icon: 'success',
            duration: 1500
          })
        }
      }
    },

    onLoad(options) {
      this.getGoodsDetail(options.goods_id)
    },
    
    mixins: [mixin]
  }
</script>

<style lang="less">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-container {
    display: flex;
    align-items: center;
    padding-left: 20rpx;

    .goods-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 80%;
      height: 300rpx;

      .goods-price {
        color: #AA0000;
        font-size: 50rpx
      }

      .goods-name {
        font-size: 32rpx;
        border-right: 1px lightgray solid;
      }

      .goods-carriage {
        color: #929293;
      }
    }

    .store-up {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      color: gray;
    }
  }
  
  .goods-detail {
    padding-bottom: 100rpx;
  }
  
  .goods-nav {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
  }
</style>
