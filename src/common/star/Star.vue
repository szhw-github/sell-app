<template>
    <div class="star-container" :style="container" v-if="score&&hasGetSize&&hasGetStarClass">
      <div class="star"
           :class="['star'+size,item]"
           v-for="item in starClass"
           :style="star"
      >
      </div>
    </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

    export default {
      name: "CommonStar",
      props: {
        score: Number,
        size: Number
      },
      data () {
        return {
          onCount: 0,
          halfCount: 0,
          offCount: 0,
          star: {
            width: null,
            height: null,
            marginLeft: null,
            marginRight: null,
            backgroundSize: null,
            backgroundRepeat: 'no-repeat'
          },
          container:{
            width: null,
            height: null
          },
          starClass:[]
        }
      },
      computed: {
        hasGetSize () {
          const size = this.size + 'px'
          const halfSize = this.size*0.5 + 'px'
          this.star.width = size
          this.star.height = size
          this.star.marginLeft = halfSize
          this.star.marginRight = halfSize
          this.star.backgroundSize = [size, size]
          this.container.width = 2*LENGTH*this.size +'px'
          this.container.height = size
          return true
        },
        hasGetStarClass () {
          var onCount = parseInt(this.score)
          var halfCount = Math.round(this.score - onCount)
          for (var i = 0; i < LENGTH; i ++) {
            if (onCount > 0) {
              this.starClass.push(CLS_ON)
              onCount --
            }
            else if (halfCount > 0) {
              this.starClass.push(CLS_HALF)
              halfCount = 0
            }
            else {
              this.starClass.push(CLS_OFF)
            }
          }
          return true
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .star-container
    display flex
    position relative
    background rgba(0,0,0,0)
    .on
      &.star24
        background-image url('imgs/star24_on@2x.png')
      &.star36
        background-image url('imgs/star48_on@2x.png')
      &.star48
        background-image url('imgs/star48_on@2x.png')
    .half
      &.star24
        background-image url('imgs/star24_half@2x.png')
      &.star36
        background-image url('imgs/star48_half@2x.png')
      &.star48
        background-image url('imgs/star48_half@2x.png')
    .off
      &.star24
        background-image url('imgs/star24_off@2x.png')
      &.star36
        background-image url('imgs/star48_off@2x.png')
      &.star48
        background-image url('imgs/star48_off@2x.png')
</style>
