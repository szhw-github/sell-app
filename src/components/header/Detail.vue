<template>
    <div class="container">
        <div class="name">{{seller.name}}</div>
        <div class="star">
          <star :score="seller.score" :size="24"></star>
        </div>

      <div class="content" ref="wrapper">
        <div>
          <div class="header">
            <div class="line"></div>
            <p class="text">优惠信息</p>
            <div class="line"></div>
          </div>
          <div class="supports-wrapper">
            <div class="supports" v-for="item in seller.supports" :key="item.type">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </div>
          </div>
          <div class="header">
            <div class="line"></div>
            <p class="text">商家公告</p>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="icon-close" @click="closeDetail"></div>
    </div>
</template>

<script>
  import Star from 'components/star/Star'
  import BScroll from 'better-scroll'
    export default {
      name: "HeaderDetail",
      props: {
          seller: Object
      },
      data () {
        return {
          classMap : ['decrease','discount','guarantee','invoice','special']
        }
      },
      components: {
        Star
      },
      methods: {
        closeDetail () {
          this.$emit('close')
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  .star-container
    margin auto
  .container
    position fixed
    z-index 10
    top 0
    left 0
    right 0
    bottom 0
    text-align center
    color #fff
    background rgba(7,17,27,0.8)
    .name
      margin-top 64px
      margin-bottom 16px
      font-size 16px
      font-weight 700
    .content
      overflow hidden
      position absolute
      top 120px
      left 36px
      right 36px
      bottom 92px
      .header
        display flex
        align-items center
        justify-content center
        margin-top 28px
        padding 0
        .text
          flex 0 0 auto
          font-size 14px
          margin 0 12px
        .line
          width 100%
          height 0
          border-top 2px solid rgba(255,255,255,0.2)
      .supports-wrapper
        padding 12px 12px 0 12px
        .supports
          display flex
          align-items center
          margin-top 12px
          .icon
            width 16px
            height 16px
            background-size 16px 16px
            margin-right 6px
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
      .bulletin
        margin 24px 12px 0 12px
        font-size 12px
        line-height 24px
        text-align left
        font-weight 200
    .icon-close
      position fixed
      left 50%
      bottom 32px
      transform translateX(-50%)
      font-size 32px
      color rgba(255,255,255,0.5)

</style>
