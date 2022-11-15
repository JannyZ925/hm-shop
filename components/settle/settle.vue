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
    <view class="pay-button">
      <text>结算({{ checkedCount }})</text>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
  export default {
    name:"settle",
    data() {
      return {
        
      };
    },
    
    computed: {
      ...mapGetters("cart", ['checkedCount', "totalCount", 'totalPrice']),
      
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
      ...mapMutations("cart", { changAllGoodsState: 'CHANGEALLGOODSSTATE'}),
      // 全选按钮点击事件
      clickSelectAllHandler() {
        this.changAllGoodsState(!this.isAllChecked)
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