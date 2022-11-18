export default {
  namespaced: true,
  
  state: {
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 用户信息
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 登录后的token字符串
    token: uni.getStorageSync('token') || '',
    // 重定向的object对象,决定自动跳转到登录页面之后要返回到哪个页面
    redirectInfo: null
  },
  
  getters: {
    // 收货详细地址的计算属性
    addressStr(state) {
      if (!state.address.provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  },
  
  actions: {
    
  },
  
  mutations: {
    // 更新收货地址
    UPDATEADDRESS(state, address) {
      state.address = address
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新用户信息
    UPDATEUSERINFO(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新token字符串
    UPDATETOKEN(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    // 更新重定向信息
    UPDATEREDIRECTINFO(state, redirectInfo) {
      state.redirectInfo = redirectInfo
    }
  }
}