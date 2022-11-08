<template>
  <view>
    <!-- 搜索组件 -->
    <search></search>
    <!-- 商品展示区域 -->
    <view class="scroll-view-container">
      <!-- 左侧滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
        <!-- 一级分类 -->
        <view :class="['left-scroll-view-item', active === index ? 'active' : '']" v-for="(category,index) in categoryList" :key="category.cate_id" @click="changeCategory(index)">
          {{ category.cat_name }}
        </view>
      </scroll-view>
      
      <!-- 右侧滚动视图区域 -->
      <scroll-view class="right-scroll-view" :style="{height: windowHeight + 'px'}" scroll-y="true" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view class="category-level2" v-for="(category2,i2) in categoryLevel2" :key="i2">
          <view class="category-level2-title">
            /{{ category2.cat_name }}/
          </view>
          <!-- 三级分类 -->
          <view class="category-level3-list">
            <view class="category-level3-item" v-for="(category3,i3) in category2.children" :key="i3" @click="goToGoodsList(category3)">
              <image class="category-level3-img" :src="category3.cat_icon.replace('dev', 'web')"></image>
              <text class="category-level3-txt">{{ category3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口可用高度 = 屏幕高度 - navigationBar高度 - tabbar高度
        windowHeight: uni.getSystemInfoSync().windowHeight - 60,
        // 一级分类数据
        categoryList: [],
        // 二级分类数据
        categoryLevel2: [],
        // 选中的一级分类的索引
        active: 0,
        // 滚动条到页面顶部的距离
        scrollTop: 0
      };
    },
    methods: {
      // 获取分类数据
      async getCategoryList(){
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.categoryList = res.message
        // 二级分类默认为第一个一级分类下的children
        this.categoryLevel2 = res.message[0].children
      },
      // 点击一级分类事件
      changeCategory(index){
        this.active = index
        // 修改二级分类
        this.categoryLevel2 = this.categoryList[index].children
        // 修改滚动条到页面顶部的距离
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 点击三级分类跳转到商品列表
      goToGoodsList(category3){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + category3.cat_id
        })
      }
    },
    onLoad(){
      this.getCategoryList()
    }
  }
</script>

<style lang="less">
.scroll-view-container {
  display: flex;
  
  // 左侧三级分类滚动视图
  .left-scroll-view {
    width: 250rpx;
    background-color: #eaeaea;
    text-align: center;
    
    .left-scroll-view-item {
      line-height: 120rpx;
      font-size: 28rpx;
      
      // 给激活的分类添加样式
      &.active {
        position: relative;
        background-color: #ffffff;
        
        // 左边红色提示条
        &::before {
          content: '';
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #AA0000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  
  // 右侧分类详情滚动视图
  .right-scroll-view {
    background-color: #ffffff;
    
    .category-level2 {
      // 三级分类名称
      .category-level2-title {
        font-size: 28rpx;
        font-weight: bold;
        text-align: center;
        padding: 30rpx 0;
      }
      
      .category-level3-list {
        display: flex;
        flex-wrap: wrap;
        
        // 三级分类项
        .category-level3-item {
          width: 33.33%;
          margin-bottom: 20rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .category-level3-img {
            width: 120rpx;
            height: 120rpx;
          }
          
          .category-level3-txt {
            font-size: 28rpx
          }
        }
      }
    }
  }
}
</style>
