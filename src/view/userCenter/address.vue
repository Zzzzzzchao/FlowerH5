<template>
  <div class="addressList" :style="flg ? 'display:block' : 'display:none'">
    <div class="title"><span @click="$emit('closeAddress')"> 后退 </span> 收货地址</div>
    <ul>
      <li>地址1</li>
      <li>地址2</li>
    </ul>
    <div class="addBtn" @click="add">新增收货地址</div>
    <!-- 录入信息弹窗 -->
    <div class="addModal" v-if="addModalFlg">
      <div class="title"><span @click="addModalFlg = false"> 后退 </span> 新增收货地址</div>
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
        <cube-form-item :field="fields[3]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">Submit</cube-button>
      </cube-form-group>
    </cube-form>
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
      }],
      addModalFlg: false,
      validity: {},
      valid: undefined,
      model: {
        inputValue: '',
        pcaValue: [],
        dateValue: ''
      },
      fields: [
        {
          type: 'input',
          modelKey: 'name',
          label: '姓名',
          props: {
            placeholder: '请输入收货人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'phone',
          label: '电话',
          props: {
            placeholder: '请输入收货人电话'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'address',
          label: '详细地址',
          props: {
            placeholder: '请输入收货人详细地址'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'lp',
          label: '门牌号',
          props: {
            placeholder: '请输入门牌号'
          },
          rules: {
            required: true
          }
        }
      ]
    }
  },
  created() {
  },
  methods: {
    clickHandler (label) {
    },
    changeHandler (label) {
    },
    add () {
      this.addModalFlg = true
    },
    submitHandler(e) {
      console.log('submit')
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    showDatePicker() {
      this.$refs.datePicker.show()
    },
    dateSelectHandler(selectedVal) {
      this.model.dateValue = new Date(selectedVal[0], selectedVal[1] - 1, selectedVal[2]).toDateString()
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
  .addModal{
    position: fixed;
    width: 100%;
    height: 100%;
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
}
</style>
