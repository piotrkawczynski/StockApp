import { createReducer } from 'reduxsauce'
import { createAsyncType, createAsyncAction, createSyncAction } from '../Services/ReduxFunctions'

/* ------------- Action Types ------------- */
// Async (Attempt, Success, Failure)
export const GET_STOCK_SEARCH_LIST = createAsyncType('stock/GET_STOCK_SEARCH_LIST')

// Sync
export const ADD_STOCK_ITEM = 'stock/ADD_STOCK_ITEM'
export const REMOVE_STOCK_ITEM = 'stock/REMOVE_STOCK_ITEM'
export const WIPE_STOCK_SEARCH_LIST = 'stock/WIPE_STOCK_ITEM'
export const UPDATE_LOGO_STOCK_ITEM = 'stock/UPDATE_LOGO_STOCK_ITEM'

/* ------------- Action Creators ------------- */
// Async (Attempt, Success, Failure)
export const getStockSearchList = createAsyncAction(GET_STOCK_SEARCH_LIST)

// Sync
export const addStockItem = createSyncAction(ADD_STOCK_ITEM)
export const removeStockItem = createSyncAction(REMOVE_STOCK_ITEM)
export const wipeStockSearchList = createSyncAction(WIPE_STOCK_SEARCH_LIST)
export const updateLogoStockItem = createSyncAction(UPDATE_LOGO_STOCK_ITEM)

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  AVKey: '5ZXUVVOXJ5S4ECMC',
  searchList: null,
  stockList: [],
}

/* ------------- Selectors ------------- */
const searchList = state => state.stock.searchList

const stockList = state => state.stock.stockList

const avkey = () => ({
  apikey: INITIAL_STATE.AVKey,
})

export const StockSelector = {
  searchList,
  avkey,
  stockList,
}

/* ------------- Reducers ------------- */
const getStockSearchListReducer = (state = INITIAL_STATE, { searchList }) => {
  return {
    ...state,
    searchList,
  }
}

const wipeStockSearchListReducer = (state = INITIAL_STATE) => {
  return {
    ...state,
    searchList: null,
  }
}

const addStockItemReducer = (state = INITIAL_STATE, { item }) => {
  const { stockList } = state

  const stockIndex = stockList.findIndex(stock => stock.symbol === item.symbol)

  if (stockIndex > -1) {
    return {
      ...state,
    }
  }

  const updatedLogoItem = { ...item, logo: null }

  const stockListCopy = [...stockList, updatedLogoItem]

  return {
    ...state,
    stockList: stockListCopy,
  }
}

const removeStockItemReducer = (state = INITIAL_STATE, element) => {
  return {
    ...state,
  }
}

const updateLogoStockItemReducer = (state = INITIAL_STATE, { symbol, logo }) => {
  const { stockList } = state

  const stockCopy = stockList.map(stock => {
    if (stock.symbol === symbol) {
      return { ...stock, logo }
    }
    return stock
  })

  return {
    ...state,
    stockList: stockCopy,
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [GET_STOCK_SEARCH_LIST.SUCCESS]: getStockSearchListReducer,
  [WIPE_STOCK_SEARCH_LIST]: wipeStockSearchListReducer,
  [ADD_STOCK_ITEM]: addStockItemReducer,
  [REMOVE_STOCK_ITEM]: removeStockItemReducer,
  [UPDATE_LOGO_STOCK_ITEM]: updateLogoStockItemReducer,
})
