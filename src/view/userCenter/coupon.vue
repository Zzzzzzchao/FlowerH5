<template>
  <div class="orderList" :style="flg ? 'display:block' : 'display:none'">
    <div class="title"><span @click="$emit('closeCoupn')"> 后退 </span> 优惠券</div>
    <cube-tab-bar
      v-model="tabVaule"
      show-slider
      :data="tabs"
      @click="clickHandler">
    </cube-tab-bar>
    <div>
      优惠券列表
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    flg: ''
  },
  data () {
    return {
      tabVaule: '未使用',
      tabs: [{
        label: '未使用'
      }, {
        label: '已使用'
      }, {
        label: '已过期'
      }]
    }
  },
  created() {
  },
  methods: {
    clickHandler (label) {
    },
    changeHandler (label) {
    }
  }
}
</script>

<style lang="less" scoped>
.orderList{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  top:0;
  left: 0;
  background: #fff;
  .title{
    line-height: 40px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid rgb(238, 238, 231);
    span{
      position: absolute;
      left: 15px;
    }
  }
}
</style>
