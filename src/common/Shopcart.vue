<template>
  <div class="container">
    <shopcart-detail v-show="showShopcartDetail"></shopcart-detail>
    <div class="count" v-show="show">{{foodsTotalCount}}</div>
    <div class="shopcart">
      <div class="circle">
      </div>
      <div class="icon-wrapper" :class="{icon_wrapper_actived: show}" @click="handleEvent('click')">
        <span class="icon-shopping_cart icon" :class="{icon_actived: show}"></span>
      </div>
      <div class="total-price" :class="{'total-price-active': show}">¥{{totalPrice}}</div>
      <p class="text">另需配送费4元</p>
      <div class="buttom">¥20起送</div>
      <div class="buttom" :class="{buttom_actived: show}" v-show="show">去结算</div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  import ShopcartDetail from '@/pages/detail/components/ShopcartDetail'
  export default {
    name: "HomeShopcart",
    components: {
      ShopcartDetail
    },
    computed: {
      ...mapGetters([
        'foodsSelected'
      ]),
      ...mapState([
        'showShopcartDetail',
        'totalPrice'
      ]),
      foodsTotalCount() {
        this.getTotalPrice()
        let count = 0
        for(let i = 0;i < this.foodsSelected.length; i++ ) {
          count += this.foodsSelected[i].count
        }
        return count
      },
      show() {
        return this.foodsSelected.length
      }
    },
    methods: {
      ...mapActions([
        'handleEvent',
        'getTotalPrice'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    z-index 9
    .count
      z-index 1
      position fixed
      left 44px
      bottom 42px
      width 24px
      height 16px
      border-radius 12px
      text-align center
      color #fff
      font-size 9px
      font-weight 700
      line-height 16px
      background red
    .shopcart
      display flex
      position absolute
      bottom 0
      left 0
      right 0
      height 48px
      line-height 48px
      text-align center
      color rgba(255,255,255,0.4)
      background #141d27
      .circle
        position absolute
        left 12px
        bottom 2px
        height 56px
        width 56px
        background #141d27
        border-radius 50%
      .icon-wrapper
        position absolute
        left 18px
        bottom 8px
        height 44px
        width 44px
        background rgba(255,255,255,0.2)
        border-radius 50%
        line-height 48px
      .icon_wrapper_actived
        background rgb(0, 160, 200)
      .icon
        font-size 24px
        color rgba(255,255,255,0.4)
      .icon_actived
        color #fff
      .total-price
        font-size 16px
        font-weight 700
        margin-left 80px
        margin-right 12px
      .total-price-active
        color #fff
      .text
        text-align left
        font-size 16px
        font-weight 200
        padding-left 12px
        padding-right 12px
      .buttom
        position absolute
        right 0
        bottom 0
        height 48px
        font-size 12px
        font-weight 700
        width 105px
        padding-left 8px
        padding-right 8px
        background rgba(255,255,255,0.2)
      .buttom_actived
        background red
        color #fff
        font-size 15px

</style>
