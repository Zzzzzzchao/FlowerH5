<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <!-- 优惠信息 -->
                <!-- <support-ico
                  v-if="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                ></support-ico> -->
                <span>{{props.txt.name}}</span>
                <!-- 选中的数量 -->
                <!-- <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span> -->
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.id"
          :label="good.name"
          :title="good.name"
        >
        <span @click="openSearch">asdasd</span>
          <div v-for="two in good.children" :key="two.id">
            <p class="smallTitle">{{two.name}}</p>
            <ul>
              <li
                @click="selectFood(food)"
                v-for="food in two.children"
                :key="food.name"
                class="food-item"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.pic">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.remark}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellAmount}}份</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control @add="onAdd" :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"></shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from 'api'
  import CartControl from 'components/cart-control/cart-control'
  import ShopCart from 'components/shop-cart/shop-cart'
  import Food from 'components/food/food'
  import SupportIco from 'components/support-ico/support-ico'
  import Bubble from 'components/bubble/bubble'
  import SearchList from 'components/searchList/searchList'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        goods: [],
        selectedFood: {},
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((two) => {
          two.children.forEach((three) => {
            three.children.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
        })
        return foods
      },
      barTxts() {
        let ret = []
        this.goods.forEach((good) => {
          const {id, name, children} = good
          let count = 0
          children.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            id,
            name,
            count
          })
        })
        return ret
      }
    },
    methods: {
      fetch() {
        if (!this.fetched) {
          this.fetched = true
          getGoods().then((goods) => {
            this.goods = goods.tree
          })
        }
      },
      selectFood(food) {
        this.selectedFood = food
        this._showFood()
        this._showShopCartSticky()
      },
      onAdd(target) {
        this.$refs.shopCart.drop(target)
      },
      _showFood() {
        this.foodComp = this.foodComp || this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            add: (target) => {
              this.shopCartStickyComp.drop(target)
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.foodComp.show()
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
      },
      /*
        打开搜索结果组件
      */
      openSearch () {
        // 查询接口拿到数据
        getGoods().then((goods) => {
          this.searchFood = goods.tree
          this._showSearchList()
          this._showShopCartSticky()
        })
      },
      _showSearchList() {
        this.searchComp = this.searchComp || this.$createSearchList({
          $props: {
            goods: 'searchFood',
            carData: 'selectFoods'
          },
          $events: {
            add: (target, carData) => {
              // 更新购物车信息
              this.goods.forEach((two) => {
                two.children.forEach((three) => {
                  three.children.forEach((food) => {
                    carData.forEach((car) => {
                      if (car.goodsId === food.goodsId) {
                        food.count = car.count
                      }
                    })
                  })
                })
              })
              this.shopCartStickyComp.drop(target, carData)
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.searchComp.show()
      }
    },
    components: {
      Bubble,
      SupportIco,
      CartControl,
      ShopCart,
      Food,
      SearchList
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position: absolute
        right: -8px
        top: -10px
      .support-ico
        display: inline-block
        vertical-align: top
        margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>

<style lang="less" scoped>
.smallTitle{
  font-size: 12px;
  padding-left: 5%;
  line-height: 24px;
}
</style>
