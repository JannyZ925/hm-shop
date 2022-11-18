<template>
  <view>
    <login v-if="!token"/>
    <personal-page v-else/>
  </view>
</template>

<script>
  import { mapState } from 'vuex';
  import mixin from '../../mixins'
  export default {
    data() {
      return {
        
      };
    },
    
    computed: {
      ...mapState("user", ['token'])
    },
    
    mixins: [mixin]
  }
</script>

<style lang="less">

</style>
