export default {
  namespaced: true,
  
  state: {
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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
    UPDATEADDRESS(state, address) {
      state.address = address
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  }
}