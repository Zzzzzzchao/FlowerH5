<template>
  <div class="homePage">
    <Search  />
    <div class="nav">
      <div>分类导航</div>
      <div>热销榜</div>
      <div>预售</div>
      <div>优惠券</div>
    </div>
    <div class="swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in 10" :key="item">
            <img class="img" src="http://img5.imgtn.bdimg.com/it/u=3365018759,2226705862&fm=26&gp=0.jpg" alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="ztg">
      <p class="title">主题馆</p>
      <div class="content">
        <div class="item" v-for="item in 10" :key='item'>
          <img src="http://img5.imgtn.bdimg.com/it/u=3365018759,2226705862&fm=26&gp=0.jpg" alt="">
          <p>名称</p>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footerDiv">
      <p>花应商城</p>
      <p>©2019 FloweIn</p>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import Search from 'components/search/search'
export default {
  components: {
    Search
  },
  name: 'homePage',
  mounted () {
    let swiperOne = new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
      pagination: '.swiper-pagination'
    })
    console.log(swiperOne)
  }
}
</script>

<style lang="less" scoped>
.homePage{
  width: 100%;
  .swiper{
     .swiper-container {
      width: 100%;
      height: 300px;
      margin-top: 20px;
    }
    .img{
      width: 100%;
    }
  }
  .nav{
    width: 100%;
    display: flex;
    div{
      flex: 1;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
  .ztg{
    .title{
      text-align: center;
      line-height: 32px;
      margin-bottom: 20px;
    }
    .content{
      padding: 0 0 0 3%;
      overflow: hidden;
      .item{
        float: left;
        width: 31%;
        margin-right: 2%;
        img{
          width: 100%;
        }
        p{
          line-height: 26px;
          font-size: 16px;
          color: #666;
          text-align: center;
        }
      }
    }
  }
  .footerDiv{
    text-align: center;
    color: #999;
    font-size: 12px;
    p{
      line-height: 16px;
    }
  }
}
</style>
