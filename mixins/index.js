import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['totalCount'])
  },

  methods: {
    setTabBarBadge(){
      uni.setTabBarBadge({
        index: 2,
        text: this.totalCount + ''
      })
    }
  },
  
  onShow() {
    if(this.totalCount > 0) this.setTabBarBadge()
  }
  
}