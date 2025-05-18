import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemType, cartSliceState } from '../@types/types'
import { RootState } from '../@types/types'

const initialState: cartSliceState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count
      }, 0)
    },
    setMinusItem(state, action: PayloadAction<CartItemType>) {
      const findMinusItem = state.items.find(item => item.id === action.payload.id)
      if (findMinusItem) {
        findMinusItem.count--
        if (findMinusItem.count === 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id)
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return sum + obj.price * obj.count
        }, 0)
      }
    },
    setRemoveItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count
      }, 0)
    },
    setclearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart

export const { setAddItem, setMinusItem, setRemoveItem, setclearItem } = cartSlice.actions
export default cartSlice.reducer
