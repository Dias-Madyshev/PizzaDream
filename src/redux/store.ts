import { configureStore } from '@reduxjs/toolkit'
import pizzas from './pizzaSlice'
import cart from './cartSlice'
import filters from './filtersSlice'
import { RootState } from '../@types/types'

export const store = configureStore({
  reducer: {
    pizzas,
    cart,
    filters,
  },
})

export type AppDispatch = typeof store.dispatch
