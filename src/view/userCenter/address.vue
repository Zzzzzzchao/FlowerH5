<template>
  <div class="addressList" :style="flg ? 'display:block' : 'display:none'">
    <div class="title"><span @click="$emit('closeAddress')"> 后退 </span> 收货地址</div>
    <ul>
      <li>地址1</li>
      <li>地址2</li>
    </ul>
    <div class="addBtn">新增收货地址</div>
    <!-- 录入信息弹窗 -->
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
.addressList{
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
  .addBtn{
    position: fixed;
    left: 10%;
    bottom: 0;
    background-color: rgb(110,126,68);
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    width: 80%;
    line-height: 36px;
    text-align: center;
  }
}
</style>
