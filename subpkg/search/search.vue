<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" placeholder="请输入搜索内容" radius="20" bgColor="#ffffff" cancelButton="none"
        clearButton="auto"></uni-search-bar>
    </view>
    
    <!-- 搜索历史 -->
      <view class="search-history-container" v-if="searchHistory.length !== 0 && keyword === ''">
        <view class="search-history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="26" @click="clickCleanIconHandler"></uni-icons>
        </view>
        <view class="search-history-list">
          <uni-tag v-for="(history, index) in histories" circle="true" :text="history" type="default" size="default" inverted="true" @click="goToGoodsList(history)" />
        </view>
      </view>
    </block>
    
    <!-- 搜索结果 -->
    <scroll-view class="search-results-container">
      <view class="search-results-item" v-for="(result,index) in searchResults" :key="index">
        <view class="goods-name" @click="goToDetail(result.goods_id)">
          {{ result.goods_name }}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 搜索关键词
        keyword: '',
        // 搜索结果
        searchResults: [],
        // 搜索历史
        searchHistory: []
      };
    },
    
    computed: {
      // this.searchHistory.reverse() 反转搜索历史数组,最后搜索的排在最前面
      /**
       * 使用Set进行去重
       * new Set(this.searchHistory.reverse())将Array转换为Set，进行去重
       * ...将Set转换为Array
       */
      histories() {
        return [...new Set([...this.searchHistory].reverse())]
      }
    },
    
    methods: {
      // 搜索框输入事件
      input(e) {
        // 进行防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyword = e
          this.getSearchResults()
        }, 500)
      },
      
      // 获取搜索结果
      async getSearchResults() {
        if (this.keyword === '') this.searchResults = []
        else {
          const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + this.keyword)
          if (res.meta.status !== 200) return uni.$showMsg()
          this.searchResults = res.message
        }
      },
      
      // 点击商品事件
      goToDetail(goods_id) {
        // 将搜索关键词加入到搜索历史记录中
        this.searchHistory.push(this.keyword)
        // 将搜索历史保存到本地
        uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory))
        // 跳转
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      
      // 点击搜索记录事件
      goToGoodsList(history) {
        // 跳转到商品列表页面
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + history
        })
      },
      
      // 点清空按钮事件
      clickCleanIconHandler() {
        uni.showModal({
          content: '确认删除全部搜索历史？',
          success: (res) => {
            if(res.confirm) {
              // 将data中的搜索记录清空
              this.searchHistory = []
              // 将本地的搜索记录清空
              uni.setStorageSync('searchHistory', [])
            }
          }
        })
      }
    },
    
    onLoad() {
      // 从本地获取搜索历史
      this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
    }
  }
</script>

<style lang="less">
  .search-box {
    background-color: #AA0000;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  .search-history-container {
    padding: 20rpx;
    
    .search-history-title {
      display: flex;
      justify-content: space-between;
      text {
        font-size: 32rpx;
      }
    }
    
    .search-history-list {
      margin-top: 20rpx;
    }
  }
  
  .search-results-container {
    display: flex;
    flex-direction: column;
    
    .search-results-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e1e1e1;
      padding: 20rpx;
      
      .goods-name{
        font-size: 30rpx;
        // 以下三行的作用是当一条搜索结果在一行放不下时用省略号代替
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
