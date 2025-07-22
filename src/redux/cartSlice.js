import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name:'cart',
  initialState: [
    {id:0, title: 'apple', count: 3},
    {id:2, title: 'watermelon', count: 10},
  ],
  reducers: {
    addCount(state, action) {
      state[action.payload].count++;
    },
    removeCount(state, action) {
      state[action.payload].count--;
  },
    addItem(state, action) {
      // 장바구니에 내가 주문하기 누른 상품이 있는지 없는지 판단
      // 판단 기준을 어떤걸로 할건지 => 상품들을 식별하는 값이 id
      // 주문하기 누른 id가 장바구니에 있나 없나를 검사해보면 될듯

      // 아마 반복문 이용하면 검사 가능할듯?

      // findIndex함수 : 조건식에 만족하는 인덱스를 리턴, 없으면 -1 리턴
      let index = state.findIndex(data => {
        return (
          data.id == action.payload.id
        )
      })
      if(index !== -1) {
        state[index].count++
      } else {
        state.push(action.payload)
      }
    },
    removeItem(state, action) {
      let index = state.findIndex(data => {
        return (
          data.id == action.payload.id
        )
      })
      state.splice(index, 1)
    }
      
}
})

export const {addCount, removeCount, addItem, removeItem} = cart.actions
export default cart;