<template>
  <view class="settle-container">
    <!-- 全选按钮 -->
    <label class="radio">
      <radio color="#AA0000" :checked="isAllChecked" @click="clickSelectAllHandler" /><text>全选</text>
    </label>
    
    <!-- 总价格 -->
    <text class="total-price">
      合计：<text>￥{{ totalPrice | toFixed }}</text>
      </text>
    
    <!-- 结算 -->
    <view class="pay-button" @click="clickSettleHandler">
      <text>结算({{ checkedCount }})</text>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex";
  import { mapMutations } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name:"settle",
    data() {
      return {
        // 提示登录时显示的秒数
        seconds: 3
      };
    },
    
    computed: {
      ...mapState("user", ['token', 'redirectInfo']),
      ...mapState("cart", ['cart']),
      ...mapGetters("user", ['addressStr']),
      ...mapGetters("cart", ['checkedCount', 'totalCount', 'totalPrice']),
      
      // 全选按钮选中状态
      isAllChecked() {
        return this.totalCount === this.checkedCount
      }
    },
    
    filters: {
      // 把数字处理为两位小数的数字
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
    
    methods: {
      ...mapMutations("user", { updateRedirectInfo: 'UPDATEREDIRECTINFO' }),
      ...mapMutations("cart", { changAllGoodsState: 'CHANGEALLGOODSSTATE'}),
      // 全选按钮点击事件
      clickSelectAllHandler() {
        this.changAllGoodsState(!this.isAllChecked)
      },
      // 结算按钮点击事件
      clickSettleHandler() {
        if(!this.checkedCount) return uni.$showMsg("请选择商品！")
        if(!this.addressStr) return uni.$showMsg("请选择收货地址！")
        // if(!this.token) return uni.$showMsg("请先登录！")
        if(!this.token) return this.showLoginTips(this.seconds)
        this.pay()
      },
      // 登录提示信息
      showLoginTips(seconds) {
        // 设置定时器.每隔一秒更新提示信息
        const timer = setInterval(() => {
          uni.showToast({
            icon: 'none',
            title: '请先登录！' + seconds + '秒后进入登录页面...',
            mask: true,
            duration: 1000
          })
          // 每提示一次,秒数减1
          seconds--
          // 若秒数小于0,则清除定时器，不再提示
          if(seconds < 0) {
            clearInterval(timer)
            // 跳转到"我的"页面
            uni.switchTab({
              url: '/pages/mine/mine',
              success: () => {
                // 更新重定向信息
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
          }
        }, 1000)
      },
      // 支付
      async pay() {
        // 订单信息
        const orderInfo = {
          // 订单金额
          order_price: this.totalPrice,
          // 订单地址
          consignee_addr: this.addressStr,
          // 订单内商品
          goods: this.cart.filter(g => g.goods_state === true).map(g => ({
            goods_id: g.goods_id,
            goods_number: g.goods_count,
            goods_price: g.goods_price
          }))
        }
        // 创建订单
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if(res.meta.status !== 200) return uni.$showMsg('订单创建失败！')
        const orderNumber = res.message.order_number
        // 订单预支付
        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number: orderNumber})
        if(res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
        const payInfo = res2.message.pay
        // 发起微信支付
        const [error, success] = await uni.requestPayment(payInfo)
        if(error) return uni.$showMsg("订单未支付！")
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {order_number: orderNumber})
        if(res3.meta.status !== 200) return uni.$showMsg("订单未支付！")
        uni.showToast({
             title: '支付完成！',
             icon: 'success'
        })
      }
    }
  }
</script>

<style lang="less">
  .settle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100rpx;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: white;
    font-size: 34rpx;
    
    .radio {
      margin-left: 10rpx;
      display: flex;
      align-items: center;
    }
    
    .total-price {
      text {
        color:  #AA0000;
      }
    }
    
    .pay-button {
      width: 30%;
      height: 100%;
      background-color: #AA0000;
      color: white;
      text-align: center;
      line-height: 100rpx;
    }
    
  }
</style>