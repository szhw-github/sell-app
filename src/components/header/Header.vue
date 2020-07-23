<template>
  <div class="home-header" v-if="seller">
    <div class="backgroud">
      <img class="backgroud-img" :src="seller.avatar">
    </div>
    <div class="content-wrapper">
      <img class="avatar" :src="seller.avatar"/>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}},满50减10</span>
        </div>
      </div>
      <div class="supports-count" @click="getDetail">
        <div class="count">{{seller.supports.length}}个</div>
        <div class="icon-keyboard_arrow_right"></div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div class="icon"></div>
      <div class="bulletin">{{seller.bulletin}}</div>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <header-detail :seller="seller" v-show="showMore" @close="closeMore"></header-detail>
  </div>
</template>

<script>
  import HeaderDetail from './Detail'
  export default {
    name: "VHeader",
    props: {
      seller: Object
    },
    data () {
      return {
        showMore: false
      }
    },
    components: {
      HeaderDetail
    },
    methods: {
      getDetail () {
        this.showMore = true
      },
      closeMore () {
        this.showMore = false
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special']
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  .home-header
    color #fff
    background rgba(7,17,27,0.5)
    .backgroud
      position fixed
      overflow hidden
      width 100%
      height 106px
      z-index -1
      filter blur(10px)
    .backgroud-img
      width 100%
    .content-wrapper
      display flex
      position relative
      padding 24px 12px 18px 24px
      .avatar
        width 64px
        height 64px
        border-radius 2px
      .content
        font-size 12px
        margin 2px 0 2px 12px
        .title
          display flex
          line-height 18px
          margin-bottom 8px
          .brand
            width 30px
            height 18px
            background-size 30px 18px
            bg-icon("brand")
            margin-right 6px
          .name
            font-size 16px
            font-weight bold
        .description
          height 12px
          font-size 12px
          font-weight 200
          margin-bottom 10px
        .supports
          display flex
          line-height 12px
          .icon
            width 12px
            height 12px
            background-size 12px 12px
            margin-right 4px
            background-repeat no-repeat
            &.decrease
              bg-icon("decrease_1")
            &.discount
              bg-icon('discount_1')
            &.guarantee
              bg-icon('guarantee_1')
            &.invoice
              bg-icon('invoice_1')
            &.special
              bg-icon('special_1')
          .text
            height 12px
            font-size 10px
            font-weight 200
            margin-bottom 0
      .supports-count
        position absolute
        display flex
        right 12px
        bottom 13px
        line-height 24px
        padding 0px 8px
        border-radius 12px
        background-color rgba(0,0,0,0.2)
        font-size 10px
        .count
          font-width 200
          margin-right 2px
        .icon-keyboard_arrow_right
          line-height 24px
    .bulletin-wrapper
      display flex
      align-items center
      padding 0 10px
      height 28px
      min-width : 0
      background-color red
      font-size 10px
      background rgba(7,17,27,0.2)
      .icon
        flex 0 0 auto
        width 22px
        height 12px
        align-items center
        background-size 22px 12px
        bg-icon("bulletin")
        background-repeat no-repeat
      .bulletin
        margin 0 4px
        font-weight 200
        padding 0
        ellipsis()
      .icon-keyboard_arrow_right
        align-items center
        color #fff

</style>
