<template>
    <div class="navigation border-bottom">
      <div class="item" v-for="item in navItemList">{{item}}</div>
    </div>
</template>

<script>
    export default {
      name: "HomeNavigation",
      data () {
        return {
          navItemList: ['商品','评价','商家']
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  border-bottom()
  .navigation
    display flex
    .item
      line-height 40px
      margin auto
      font-size 14px
      color rgb(77,85,93)
</style>
