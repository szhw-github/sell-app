<template>
  <div class="menu" ref="menu" v-if="goods" @touchstart = "handleEvent('touch')">
    <ul>
      <li class="menu-item"
          v-for="(item,index) in goods"
          :class="{current:index === currentIndex}"
      >
        <div class="text border-bottom"
             :class="'goods_'+index"
             @click="handleMenuItemClick(index)"
        >
              <span class="icon"
                    v-if="item.type>0"
                    :class="classMap[item.type]"
              ></span>
          {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name: "HomeMenu",
    props:{
      goods: Array
    },
    data () {
      return {
      }
    },
    computed: {
      maxMenuScrollY (){
        return -this.menuScroll.maxScrollY
      },
      halfMenuVisibleHeight () {
        let elementList = this.$refs.menu.getElementsByTagName('li')
        let menuHeight = elementList.length * elementList[0].clientHeight
        return 0.5*(menuHeight - this.maxMenuScrollY)
      },
      menuItemHeight () {
        let element = this.$refs.menu.getElementsByTagName('li')[0]
        return element.clientHeight
      },
      indexLength () {
        return this.$refs.menu.getElementsByTagName('li').length
      },
      ...mapState([
        'currentIndex'
      ])
    },
    methods: {
      handleMenuItemClick(index) {
        if (index !== this.currentIndex)
        this.changeClickIndex(index)
      },
      ...mapMutations([
        'changeClickIndex'
      ]),
      ...mapActions([
        'handleEvent'
      ])
    },
    watch: {
      currentIndex () {
        let upHeight = (this.currentIndex+1)*this.menuItemHeight
        let downHeight = (this.indexLength-this.currentIndex)*this.menuItemHeight
        if(upHeight <= this.halfMenuVisibleHeight+0.5*this.menuItemHeight && this.menuScroll.y!== 0) {
          this.menuScroll.scrollTo(0,0)
        }
        else if (downHeight <= this.halfMenuVisibleHeight+0.5*this.menuItemHeight && (this.menuScroll.y + this.maxMenuScrollY)){
          this.menuScroll.scrollTo(0,-this.maxMenuScrollY)
        }
        else if (upHeight > this.halfMenuVisibleHeight+0.5*this.menuItemHeight && downHeight > this.halfMenuVisibleHeight+0.5*this.menuItemHeight){
          this.menuScroll.scrollTo(0,-(upHeight-this.halfMenuVisibleHeight-0.5*this.menuItemHeight))
        }
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special']
    },
    mounted() {
      this.menuScroll = new BScroll(this.$refs.menu,{click:true})
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  @import "~styles/mixins.styl"
  border-bottom()
  .menu
    overflow hidden
    position absolute
    top 174px
    left 0
    bottom 46px
    background $grey_bg
    .menu-item
      display table
      height 54px
      padding 0 12px
      &.current
        background #fff
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 14px
          font-weight 500
      .text
        display table-cell
        vertical-align middle
        height 54px
        line-height 14px
        width 56px
        padding 0 auto
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
      .icon
        display inline-block
        vertical-align middle
        width 12px
        height 12px
        margin-right 4px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
          bg-icon("./images/decrease_3")
        &.discount
          bg-icon('./images/discount_3')
        &.guarantee
          bg-icon('./images/guarantee_3')
        &.invoice
          bg-icon('./images/invoice_3')
        &.special
          bg-icon('./images/special_3')


</style>
