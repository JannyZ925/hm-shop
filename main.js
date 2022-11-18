import Vue from 'vue'
import App from './App'
import store from './store'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 将按需引入的http挂载到顶级对象uni身上，页面可以通过uni.$http来发起请求
uni.$http = $http

// 添加基础路径
$http.baseUrl = "https://www.uinav.com"

// 请求开始前做一些事情(options表示请求的一些配置)
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: "玩命加载中...",
    mask: true
  })
  /* 只有在登录之后才允许调用支付相关的接口，所以必须为有权限的接口添加身份认证的请求头字段 */
  // 判断请求的是否为有权限的API接口
  if(options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      Authorization: store.state.user.token
    }
  }
}

// 请求结束后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装请求失败的提示方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
