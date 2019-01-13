<template>
  <div class="orderList" :style="flg ? 'display:block' : 'display:none'">
    <div class="title"><span @click="$emit('closeOrder')"> 后退 </span> 订单列表</div>
    <cube-tab-bar
      v-model="tabVaule"
      show-slider
      :data="tabs"
      @click="clickHandler">
    </cube-tab-bar>
    <div>
      列表
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    typeName: '',
    flg: ''
  },
  data () {
    return {
      tabVaule: '',
      tabs: [{
        label: '全部订单'
      }, {
        label: '待付款'
      }, {
        label: '待发货'
      }, {
        label: '待收货'
      }, {
        label: '待评论'
      }]
    }
  },
  created() {
    this.tabVaule = this.typeName
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
