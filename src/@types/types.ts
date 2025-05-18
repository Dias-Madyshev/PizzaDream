export interface CartItemType {
  id: number
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface PizzaItem {
  id: number
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export interface pizzasSliceState {
  items: PizzaItem[]
  status: 'loading' | 'success' | 'error'
  totalCount: number
}

export interface cartSliceState {
  items: CartItemType[]
  totalPrice: number
}

export interface filtersSliceState {
  categoryId: number
  sortFilter: {
    name: string
    sortProperty: string
  }
  currentPage: number
  search: string
}

export interface RootState {
  pizzas: pizzasSliceState
  cart: cartSliceState
  filters: filtersSliceState
}
