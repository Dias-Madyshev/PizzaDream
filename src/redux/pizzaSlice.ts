import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItem, pizzasSliceState } from '../@types/types'

const initialState: pizzasSliceState = {
  items: [],
  status: 'loading',
  totalCount: 0,
}

export const fetchPizzas = createAsyncThunk<
  { items: PizzaItem[]; totalCount: number },
  Record<string, string>
>('pizza/fetchPizzasStatus', async params => {
  const { sortBy, order, category, search, page = '1', limit = '8' } = params
  const baseUrl = 'https://681605f032debfe95dbd2aab.mockapi.io/items'
  const queryParams = new URLSearchParams()

  if (page) queryParams.append('page', page)
  if (limit) queryParams.append('limit', limit)
  if (sortBy) queryParams.append('sortBy', sortBy)
  if (order) queryParams.append('order', order)
  if (category) queryParams.append('category', category)
  if (search) queryParams.append('title', search)

  const queryString = queryParams.toString()
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl

  const { data, headers } = await axios.get<PizzaItem[]>(url)
  const totalCount = parseInt(headers['x-total-count'] || '0')
  return { items: data, totalCount }
})

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalCount = action.payload.totalCount
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = 'error'
        state.items = []
        state.totalCount = 0
      })
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
