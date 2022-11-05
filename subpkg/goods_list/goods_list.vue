<template>
  <view>
    <view class="goods-container" v-for="(goods,index) in goodsList" :key="index">
      <view class="goods-item" @click="goToDetail(goods.goods_id)">
        <view class="goods-img">
          <image :src="goods.goods_small_logo || defaultPic"></image>
        </view>
        <view class="goods-info">
          <text class="goods-name">{{ goods.goods_name }}</text>
          <text class="goods-price">￥{{ goods.goods_price | toFixed}}</text>
        </view>
      </view>
    </view>
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
          pagesize: 5
        },
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    
    filters: {
      // 把数字处理为两位小数的数字
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
    
    methods: {
      // 获取商品列表
      async getGoodsList(callback) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if(res.meta.status !== 200) return uni.$showMsg()
        // 数据请求完毕后调用回调函数
        callback && callback()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      
      // 列表项点击事件
      goToDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    },
    
    // 监听用户上拉触底事件
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return uni.$showMsg('没有数据了哦')
      }
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
    
    .goods-item {
      display: flex;
      padding: 20rpx;
      border-bottom: 1px solid lightgrey;
      
      .goods-img {
        margin-right: 20rpx;
        
        image {
          width: 250rpx;
          height: 250rpx;
        }
      }
      
      .goods-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .goods-name {
          font-size: 30rpx
        }
        
        .goods-price {
          font-size: 40rpx;
          color: #AA0000;
        }
      }
    }
  }
</style>
