import Vue from "vue"
export default {
  initCountList(state) {
    state.initializedCountList = []
    state.countList = []
    if (state.goods.length) {
      for (let i = 0; i < state.goods.length; i++) {
        let foodsLength = state.goods[i].foods.length
        state.initializedCountList.push(new Array(foodsLength).fill(0))
        state.countList.push(new Array(foodsLength).fill(0))
      }
    }
  },
  changeCount(state, data) {
    let i = data.i
    let j = data.j
    let count = data.count
    Vue.set(state.countList[i], j, count)
  },
  changeCurrentIndex (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  changeClickIndex (state, index) {
    state.clickIndex = index
  },
  addCount(state, item) {
    state.countList.push(item)
  },
  getGoods (state, goods) {
    state.goods = goods
  },
  setShowShopcartDetail (state,action) {
    if (action === 'click') {
      state.showShopcartDetail = !state.showShopcartDetail;
    }
    if (action === 'touch') {
      state.showShopcartDetail = false
    }
  },
  getElementClicked (state,element) {
    state.elementClicked.push(element)
  }
}
