<template>
  <div class="foods-wrapper" ref="foods" @touchstart.prevent = "handleEvent('touch')">
    <ul>
      <li class="category"
          v-for="(item,index_good) in goods"
          :ref="'goods_'+index_good"
      >
        <div class="head border-left">{{item.name}}</div>
        <div class="food-wrapper food-wrapper-hook">
          <div class="food"
               :class="{'border-top': index_food}"
               v-for="(food,index_food) in item.foods"
               :key="index_food"
          >
            <div class="link-to" @click="handleFoodClick(index_good,index_food)">
              <div class="img-wrapper">
                <img class="food-img" :src="food.image">
              </div>
              <div class="content">
                <div class="title">{{food.name}}</div>
                <div class="description" v-show="food.description!==''">{{food.description}}</div>
                <div class="sales">月售{{food.sellCount}}份 好评率{{food.rating}}% </div>
                <div class="price">
                  <span class="actual-price" :style="{fontSize: food.oldPrice ? '14px' : '10px'}">¥{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </div>
            <div class="choose" v-if="countList.length">
              <div class="icon-remove_circle_outline"
                   v-show="countList[index_good][index_food]"
                   @click="handleClick(index_good,index_food, 'remove')"
              ></div>
              <div class="number"
                   v-show="countList[index_good][index_food]"
              >{{countList[index_good][index_food]}}</div>
              <div class="icon-add_circle"
                   @click="handleClick(index_good,index_food,'add')"
                   :ref="'icon_add_' + index_good + '_' + index_food"
              ></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <food-detail v-show="showFood" :food="food" :index="foodClickedIndex" @closeFoodDetail="closeFoodDetail"></food-detail>
  </div>
</template>

<script>
  import FoodDetail from "components/food-detail/FoodDetail"
  import BScroll from "better-scroll"
  import { mapState, mapMutations,mapActions} from 'vuex'
  export default {
    name: "VFoods",
    data () {
      return {
        foodItemHeightList:[],
        scrollY: 0,
        showFood: false,
        food: null,
        foodClickedIndex: {
          i:0,
          j:0
        }
      }
    },
    components: {
      FoodDetail
    },
    computed: {
      ...mapState([
        'goods',
        'countList',
        'currentIndex',
        'clickIndex'
      ]),
      scrollIndex() {
        let currentY = this.scrollY
        for (let i = 0; i < this.foodItemHeightList.length; i++) {
          if (currentY >= this.foodItemHeightList[i] && currentY < this.foodItemHeightList[i + 1]) {
            return i
          }
        }
        return 0
      }
    },
    watch: {
      scrollIndex () {
        this.changeCurrentIndex(this.scrollIndex)
      },
      clickIndex () {
        let element = this.$refs['goods_' + this.clickIndex][0]
        this.goodsScroll.scrollToElement(element)
      }
    },
    methods: {
      handleFoodClick(i,j) {
        this.showFood = true
        this.food = this.goods[i].foods[j]
        this.foodClickedIndex = {
          i,
          j
        }
      },
      handleClick(i, j, type) {
        let delta = type === 'add' ? 1 : -1
        let count = this.countList[i][j] + delta
        this.changeCount({
          i,
          j,
          count
        })
        if (type === 'add') {
          this.getElementClicked(this.$refs['icon_add_' + i +'_' + j][0])
        }
      },
      _getHeight () {
        let height =0
        this.foodItemHeightList.push(height)
        const foodsElements = this.$refs['foods'].getElementsByTagName("li")
        for(let i=0;i<foodsElements.length;i++ ){
          height += foodsElements[i].clientHeight
          this.foodItemHeightList.push(height)
        }
      },
      ...mapMutations([
        'changeCount',
        'addCount',
        'changeCurrentIndex',
        'getElementClicked'
      ]),
      ...mapActions([
        'handleEvent'
      ]),
      closeFoodDetail(){
        this.showFood =false
      }
    },
    mounted() {
      this._getHeight()
      this.goodsScroll = new BScroll(this.$refs.foods,{click:true,probeType: 3})
      this.$nextTick(() => {
        this.goodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/variable.styl"
  .border-top
    &:before
      border-color rgba(7,17,27,0.1)
      border-width 2px
  .border-left
    &:before
      border-color #d9dde1
      border-width 5px
  .foods-wrapper
    overflow hidden
    position absolute
    top 174px
    left 80px
    right 0
    bottom 46px
    .head
      padding-left 14px
      font-size 12px
      color rgb(147,153,159)
      line-height 24px
      font-weight normal/700
      background $grey_bg
    .food-wrapper
      padding 0 18px
      .food
        padding 18px 0
        position relative
        .link-to
          display flex
          .img-wrapper
            overflow hidden
            flex 0 0 auto
            width 60px
            height 60px
            .food-img
              height 100%
              width 100%
              object-fit cover
          .content
            flex 1
            margin-left 10px
            margin-top 2px
            .title
              font-size 14px
              color rgb(7,17,27)
              line-height 14px
              margin-top 2px
              margin-bottom 8px
            .description
              font-size 10px
              color rgb(147,153,159)
              line-height 12px
              margin-bottom 8px
            .sales
              font-size 10px
              color rgb(147,153,159)
              line-height 10px
              margin-bottom 8px
            .actual-price
              font-size 10px
              color red
              font-weight 700
              line-height 24px
            .old-price
              font-size 10px
              color rgb(147,153,159)
              font-weight 700
              line-height 24px
              text-decoration line-through
        .choose
          display flex
          flex 0 0 auto
          position absolute
          right 5px
          bottom 18px
          height 24px
          line-height 24px
          font-size 24px
          color rgb(0,160,220)
          .number
            font-size 10px
            color rgb(147,153,159)
            width 24px
            text-align center

</style>
