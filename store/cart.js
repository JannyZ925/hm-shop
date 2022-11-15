export default {
  namespaced: true,
  state: {
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  },
  
  getters: {
    // 购物车中商品总数
    totalCount(state) {
      return state.cart.length
    },
    // 已勾选的商品数量
    checkedCount(state) {
      return state.cart.reduce((totalCount, item) => {
        if(item.goods_state) totalCount += 1
        return totalCount
      }, 0)
    },
    // 勾选的商品总价格
    totalPrice(state) {
      return state.cart.reduce((totalPrice, item) => {
        if(item.goods_state) totalPrice += (item.goods_price * item.goods_count)
        return totalPrice
      }, 0)
    }
  },

  actions: {

  },

  mutations: {
    // 将商品添加到购物车
    ADDTOCART(state, goods) {
      // 判断传入的商品在购物车中是否已存在
      const result = state.cart.find(g => g.goods_id === goods.goods_id)
      // 不存在则加入购物车
      if(!result){
        state.cart.push(goods)
      } else { // 存在则将商品数量加1
        result.goods_count += 1
      }
      // 将数据存储到本地
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    
    // 修改购物车中商品的勾选状态
    CHANGEGOODSSTATE(state, goods){
      // 找到要修改的商品
      const result = state.cart.find(g => g.goods_id === goods.goods_id)
      // 修改勾选状态
      result.goods_state = !goods.goods_state
      // 更新本地数据
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },

    // 修改购物车中商品数量
    CHANGEGOODSCOUNT(state, goods) {
      // 找到要修改的商品
      const result = state.cart.find(g => g.goods_id === goods.goods_id)
      // 修改商品数量
      result.goods_count = goods.goods_count
      // 更新本地数据
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },

    // 删除购物车中商品
    DELETEGOODS(state, goods) {
      // 过滤出符合要求的商品
      state.cart = state.cart.filter(g => g.goods_id !== goods.goods_id)
      // 更新本地数据
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    
    // 修改所有商品的选中状态
    CHANGEALLGOODSSTATE(state, newVal) {
      state.cart.forEach(goods => goods.goods_state = newVal)
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    } 
  }
}
