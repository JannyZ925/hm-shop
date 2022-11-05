<template>
  <view>
    <view class="search-box">
      <search></search>
    </view>
    
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(swiper, index) in swiperList" :key="swiper.goods_id">
        <navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?goods_id=' + swiper.goods_id">
          <image :src="swiper.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(nav, index) in navList" :key="index" @click="navClickHandler(nav)">
        <image :src="nav.image_src"></image>
      </view>
    </view>
  
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(floor, index) in floorList" :key="index">
        <!-- 楼层名 -->
        <image class="floor-title" :src="floor.floor_title.image_src"></image>
        <!-- 商品列表 -->
        <view class="floor-img-box">
          <!-- 左边大盒子 -->
          <navigator class="left-img-box" :url="floor.product_list[0].url">
            <image :src="floor.product_list[0].image_src" 
              :style="{width: floor.product_list[0].image_width + 'rpx'}"
              mode="widthFix">
            </image>
          </navigator>
          <!-- 右边四个小盒子 -->
          <view class="right-img-box">
            <navigator v-for="(product, index) in floor.product_list" :key="index" v-if="index !== 0" :url="product.url">
              <image :src="product.image_src" 
                :style="{width: product.image_width + 'rpx'}"
                mode="widthFix">
              </image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { $http } from '@escook/request-miniprogram';
  export default {
    data() {
      return {
        // 轮播图数据
        swiperList: [],
        // 分类导航数据
        navList: [],
        // 楼层数据
        floorList: []
      };
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      // 获取分类导航数据
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 分类导航点击事件
      navClickHandler(item) {
        if(item.name === "分类") {
          uni.switchTab({
            url: "/pages/category/category"
          })
        }
      },
      // 获取楼层数据
      async getFloorList(){
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg()
        // 给product加上一个url属性,用于点击跳转
        res.message.forEach(floor => {
          floor.product_list.forEach(pro => {
            pro.url = "/subpkg/goods_list/goods_list?" + pro.navigator_url.split("?")[1]
          })
        })
        this.floorList = res.message
      }
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    }
  }
</script>

<style lang="less">
  // 搜索框
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  // 轮播图
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类导航
  .nav-list {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 0;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }
  
  // 楼层
  .floor-list {
    margin: 15rpx;
    
    & .floor-item {
      margin-bottom: 15rpx;
    }
    
    .floor-title {
      width: 100%;
      height: 60rpx;
    }
    
    .floor-img-box {
      display: flex;
      
      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
</style>
