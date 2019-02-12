<template>
  <div class="searchCom">
    <i class="cubeic-search icon" ></i>
    <div class="input">
      <cube-input v-model="value" placeholder="请输入关键字" type='search'></cube-input>
    </div>
    <span class="btn" @click="openSearch">搜索</span>
    <SearchList v-if="flg" :goods='searchFood' @leave='flg = false'/>
  </div>
</template>

<script>
import { getGoods } from 'api'
import SearchList from 'components/searchList/searchList'
import CartControl from 'components/cart-control/cart-control'

  export default {
    name: 'search',
    props: {
    },
    data() {
      return {
        value: '',
        flg: false,
        searchFood: []
      }
    },
    computed: {
      selectFoods() {
        let foods = []
        this.searchFood.forEach((two) => {
          two.children.forEach((three) => {
            three.children.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
        })
        return foods
      }
    },
    methods: {
      openSearch () {
        // 查询接口拿到数据
        getGoods().then((goods) => {
          this.searchFood = goods.tree
          this.flg = true
          this._showShopCartSticky()
        })
      },
      add (target) {
        this.shopCartStickyComp.drop(target)
      },
      _showShopCartSticky() {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartSticky() {
        this.shopCartStickyComp.hide()
      }
    },
    components: {
      SearchList,
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .bubble
    display: inline-block
    padding: 0 5px
    height: 16px
    line-height: 16px
    text-align: center
    border-radius: 16px
    font-family: Helvetica
    font-weight: 700
    font-size: $fontsize-small-s
    color: $color-white
    background: linear-gradient(to right, $color-orange, $color-red)
</style>

<style lang="less" scoped>
.searchCom{
  position: relative;
  padding: 10px;
  .icon{
    position: absolute;
    top:19px;
    left: 5%;
    z-index: 2;
    font-size: 24px;
    color: #666;
  }
  .input{
    float: left;
    width: 88%;
    .cube-input{
      padding-left: 10%;
      border-radius: 10px;
    }
  }
  .btn{
    line-height: 40px;
    font-size: 16px;
    color: #666;
    margin: 5px;
  }
  .cube-input_active::after{
    border-color: #666;
  }
}
</style>
