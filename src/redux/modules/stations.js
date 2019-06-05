import axios from 'axios'

// Actions
export const FETCH_REQUEST = 'stations/FETCH_REQUEST'
export const FETCH_SUCCESS = 'stations/FETCH_SUCCESS'
export const FETCH_FAILURE = 'stations/FETCH_FAILURE'

// Action Creators
export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export const fetchSuccess = list => ({
    type: FETCH_SUCCESS,
    list,
})

export const fetchFailure = (error = '取得資料時，發生錯誤') => ({
  type: FETCH_FAILURE,
  error,
})

export const fetchStations = () => {
  return dispatch => {
    const baseURL = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR'

    dispatch(fetchRequest())

    return axios
          .get(`${baseURL}/Station?$select=StationID%2CStationName&$format=JSON`)
          .then(response => dispatch(fetchSuccess(response.data)))
          .catch(() => dispatch(fetchFailure()))
  }
}

// Reducer
export const defaultState = {
  isFetching: false,
  list: [],
  error: null,
}

const stations = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: [...action.list],
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default stations