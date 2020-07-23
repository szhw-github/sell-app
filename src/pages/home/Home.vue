<template>
  <div>
    <home-header :seller="seller"></home-header>
    <home-navigation></home-navigation>
    <home-menu :goods="goods" v-if="goods"></home-menu>
    <home-goods :goods="goods" v-if="goods"></home-goods>
    <home-shopcart></home-shopcart>
    <falling-ball></falling-ball>
  </div>
</template>

<script>
  import HomeHeader from "./components/Header";
  import HomeNavigation from "./components/Navigation";
  import HomeMenu from './components/Menu'
  import HomeGoods from "./components/Goods";
  import HomeShopcart from "@/common/Shopcart";
  import FallingBall from "./components/FallingBall";
  import axios from "axios";
  import {mapState,mapMutations} from 'vuex'
    export default {
      name: "Home",
      data () {
        return {
          seller: null,
          goods: null,
          currentIndex: 0,
          clickIndex: 0,
        }
      },
      components: {
        HomeHeader,
        HomeNavigation,
        HomeMenu,
        HomeGoods,
        HomeShopcart,
        FallingBall
      },
      computed: {
        ...mapState([
          'countList'
        ])
      },
      methods: {
        getSellerInfo () {
          axios.get('/api/seller.json')
            .then(res=>{
              this.seller = res.data.seller
            })
        },
        getGoodsInfo () {
          axios.get('/api/goods.json')
            .then(res=>{
              this.goods = res.data.goods
              this.getGoods(res.data.goods)
              if (this.countList.length === 0) {
                this.initCountList()
              }
            })
        },
        getRatingsInfo () {
          axios.get('/api/ratings.json')
            .then(res=>{
              this.ratings = res.data.ratings
            })
        },
        ...mapMutations([
          'getGoods',
          'initCountList'
        ])
      },
      mounted() {
        this.getSellerInfo()
        this.getGoodsInfo()
        this.getRatingsInfo()
      }
    }
</script>

<style lang="stylus" scoped>

</style>
