<template>
  <view class="search-container">
    <view class="search-input" @click="goToSearch">
      <uni-icons type="search" size="25" class="search-icon"></uni-icons>
      <text class="search-placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"search",
    data() {
      return {
        show: true,
        showSync: true
      };
    },
    methods: {
      goToSearch(){
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="less">
.search-container {
  background-color: #AA0000;
  padding: 20rpx;
  
  .search-input {
    line-height: 80rpx;
    background-color: white;
    border-radius: 40rpx;
    text-align: center;
    
    .search-icon {
      vertical-align: middle;
    }
    
    .search-placeholder {
      font-size: 32rpx;
      margin-left: 10rpx;
    }
  }
}
</style>