<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    $http
  } from '@escook/request-miniprogram';
  export default {
    data() {
      return {
        swiperList: []
      };
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      }
    },
    onLoad() {
      this.getSwiperList()
    }
  }
</script>

<style lang="less">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
</style>
