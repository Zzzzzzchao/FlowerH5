<template>
  <div id="app">
    <div class="page">
      <router-view></router-view>
    </div>
    <ul class="footer" v-if='selectedLabelDefault !== "商品"'>
       <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler" />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selectedLabelDefault: '首页',
      tabs: [{
        label: '首页',
        icon: 'cubeic-home'
      }, {
        label: '商品',
        icon: 'cubeic-like'
      }, {
        label: '购物车',
        icon: 'cubeic-vip'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  created() {
    setTimeout(() => {
      let url = this.$route.name
      switch (url) {
        case 'home':
          this.selectedLabelDefault = '首页'
        break
        case 'goods':
          this.selectedLabelDefault = '商品'
        break
        case 'shopCar':
          this.selectedLabelDefault = '购物车'
        break
        case 'userCenter':
          this.selectedLabelDefault = '我的'
        break
      }
    }, 200)
  },
  mounted() {
  },
  methods: {
    clickHandler (label) {
      if (label === this.selectedLabelDefault) {
        return
      }
      switch (label) {
        case '首页':
          this.$router.push('home')
        break
        case '商品':
          this.$router.push('goods')
        break
        case '购物车':
          this.$router.push('shopCar')
        break
        case '我的':
          this.$router.push('userCenter')
        break
      }
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
  overflow-scrolling:touch;
}
.page{
  padding-bottom: 50px;
}
.footer{
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid rgb(238, 238, 231);
}
</style>
