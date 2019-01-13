<template>
  <div class="userCenter">
    <!-- 个人信息 -->
    <div class="userData">
      <div class="top">
        <img class="img" src="http://img4.duitang.com/uploads/item/201408/01/20140801155835_uLMPZ.jpeg" alt="">
        <div class="name">
          <p>用户名</p>
          <p>会员等级  <span>积分</span></p>
        </div>
      </div>
      <div class="bottom">
        <div>我的收藏</div>
        <div>我的咨询</div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 订单信息 -->
    <div class="orderData">
      <p class="title">我的订单 <span @click="openOrder('全部订单')">查看全部 >></span></p>
      <div class="list">
        <cube-tab-bar
          v-model="tabVaule"
          :data="tabs"
          @click="clickHandler">
        </cube-tab-bar>
      </div>
    </div>
    <div class="line"></div>
    <!-- 常用功能 -->
    <div class="function">
      <p class="title">常用功能</p>
      <ul class="list">
        <li><img src="http://img4.duitang.com/uploads/item/201408/01/20140801155835_uLMPZ.jpeg" alt=""> <p>预存款</p></li>
        <li><img src="http://img4.duitang.com/uploads/item/201408/01/20140801155835_uLMPZ.jpeg" alt=""> <p>我的积分</p></li>
        <li @click="openCoupon"><img src="http://img4.duitang.com/uploads/item/201408/01/20140801155835_uLMPZ.jpeg" alt=""> <p>优惠券</p></li>
        <li @click="openAddress"><img src="http://img4.duitang.com/uploads/item/201408/01/20140801155835_uLMPZ.jpeg" alt=""> <p>收货地址</p></li>
      </ul>
    </div>
    <!-- 组件弹窗 -->
    <div v-if="orderFlg"><Order :typeName="orderNmae" :flg="orderFlg" @closeOrder="closeOrder" /></div>
    <div v-if="couponFlg"><Coupon :flg="couponFlg" @closeCoupn="closeCoupn" /></div>
    <div v-if="addressFlg"><Address :flg="addressFlg" @closeAddress="closeAddress" /></div>
  </div>
</template>

<script>
import Order from './order.vue'
import Coupon from './coupon.vue'
import Address from './address.vue'
export default {
  name: '',
  components: {
    Order,
    Coupon,
    Address
  },
  data () {
    return {
      tabVaule: '',
      tabs: [{
        label: '待付款',
        icon: 'cubeic-home'
      }, {
        label: '待发货',
        icon: 'cubeic-like'
      }, {
        label: '待收货',
        icon: 'cubeic-vip'
      }, {
        label: '待评论',
        icon: 'cubeic-person'
      }, {
        label: '售后',
        icon: 'cubeic-person'
      }],
      orderFlg: false,
      orderNmae: '',
      couponFlg: false,
      addressFlg: false
    }
  },
  methods: {
    clickHandler (label) {
      if (label === '售后') {
        return
      }
      this.orderNmae = label
      this.orderFlg = true
    },
    changeHandler (label) {
    },
    openOrder (name) {
      this.orderNmae = name
      this.orderFlg = true
    },
    closeOrder () {
      this.orderNmae = ''
      this.orderFlg = false
    },
    openCoupon () {
      this.couponFlg = true
    },
    closeCoupn () {
      this.couponFlg = false
    },
    openAddress () {
      this.addressFlg = true
    },
    closeAddress () {
      this.addressFlg = false
    }
  }
}
</script>

<style lang="less" scoped>
.userCenter{
  background-color: #fff;
  height: 100%;
  .line{
    height: 20px;
    background-color: #f3f5f7;
  }
  .userData{
    background-color: #fff;
    width: 90%;
    margin-left: 5%;
    border-radius: 10px;
    .top{
      overflow: hidden;
      margin-bottom: 15px;
      .img{
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 15px 0 0 20px;
      }
      .name{
        float: left;
        margin: 30px 0 0 20px;
      }
    }
    .bottom{
      width: 90%;
      margin-left: 5%;
      border-top: 1px solid rgb(238, 238, 231);
      display: flex;
      line-height: 40px;
      height: 40px;
      text-align: center;
      div{
        flex: 1;
        font-size: 14px;
      }
    }
  }
  .orderData,.function{
    background-color: #fff;
    .title{
      width: 90%;
      margin: 0 auto;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      border-bottom: 1px solid rgb(238, 238, 231);
      span{
        float: right;
      }
    }
    .list{
      padding: 10px 0;
    }
  }
  .function{
    .list{
      overflow: hidden;
      li{
        float: left;
        text-align: center;
        width: 33%;
        margin: 10px 0;
        font-size: 14px;
        img{
          width: 30px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>

<style lang="less" >
.list{
  .cube-tab div{
    margin-top: 5px;
    font-size: 14px;
  }
  .cube-tab_active{
    color: #666;
  }
}
</style>
