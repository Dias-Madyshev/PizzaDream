import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, filtersSliceState } from '../@types/types'

const initialState: filtersSliceState = {
  currentPage: 1,
  categoryId: 0,
  sortFilter: {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  },
  search: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortId(state, action: PayloadAction<{ name: string; sortProperty: string }>) {
      state.sortFilter = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(
      state,
      action: PayloadAction<{
        sortFilter: typeof initialState.sortFilter
        categoryId: string
        currentPage: string
      }>,
    ) {
      state.sortFilter = action.payload.sortFilter
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },
})

export const selectFilters = (state: RootState) => state.filters
export const { setCategoryId, setSortId, setCurrentPage, setFilters, setSearch } =
  filtersSlice.actions
export default filtersSlice.reducer
