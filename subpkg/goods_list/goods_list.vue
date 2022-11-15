<template>
  <view>
    <goods-item v-for="(goods,index) in goodsList" :key="index" :goods="goods"></goods-item>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品列表
        goodsList: [],
        // 商品总数
        total: 0,
        // 参数对象
        queryObj: {
          // 关键词
          query: '',
          // 分类id
          cid: '',
          // 页数索引
          pagenum: 1,
          // 每页的数据条数
          pagesize: 20
        }
      };
    },
    
    methods: {
      // 获取商品列表
      async getGoodsList(callback) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if(res.meta.status !== 200) return uni.$showMsg()
        // 数据请求完毕后，如果传了回调函数就调用
        callback && callback()
        // 合并已有的商品和新获取的商品
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    },
    
    // 监听用户上拉触底事件
    onReachBottom() {
      // 判断是否所有数据都请求完毕
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return uni.$showMsg('没有数据了哦')
      }
      // 页数增加1
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    
    // 监听用户下拉事件
    onPullDownRefresh() {
      // 重置数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodsList = []
      // 重新发起请求，并关闭下拉刷新区域
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    
    onLoad(options) {
      // 获取传递过来的参数，存入queryObj中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
  }
</script>

<style lang="less">
  .goods-container {
    display: flex;
    flex-direction: column;
  }
</style>
