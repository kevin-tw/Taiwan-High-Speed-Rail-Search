import axios from 'axios'

// Actions
export const FETCH_REQUEST = 'schedule/FETCH_REQUEST'
export const FETCH_SUCCESS = 'schedule/FETCH_SUCCESS'
export const FETCH_FAILURE = 'schedule/FETCH_FAILURE'

// Action Creators
export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export const fetchSuccess = ({ ODFare, dailyTimetable }) => ({
    type: FETCH_SUCCESS,
    ODFare,
    dailyTimetable,
})

export const fetchFailure = (error = '取得資料時，發生錯誤') => ({
  type: FETCH_FAILURE,
  error,
})

export const fetchSchedule = ({ trainDate, originStation, destinationStation }) => {
  return dispatch => {
    const baseURL = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR'

    dispatch(fetchRequest())

    return axios
          .all([
            axios.get(`${baseURL}/ODFare/${originStation}/to/${destinationStation}?$select=Fares&$format=JSON`),
            axios.get(`${baseURL}/DailyTimetable/OD/${originStation}/to/${destinationStation}/${trainDate}?$format=JSON`),
          ])
          .then(axios.spread((ODFare, dailyTimetable) => {
            dispatch(fetchSuccess({
              ODFare: ODFare.data,
              dailyTimetable: dailyTimetable.data,
            }))
          }))
          .catch(() => dispatch(fetchFailure()))
  }
}

// Reducer
export const defaultState = {
  isFetching: false,
  ODFare: [],
  dailyTimetable: [],
  error: null,
}

const schedule = (state = defaultState, action) => {
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
        ODFare: action.ODFare,
        dailyTimetable: action.dailyTimetable,
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

export default schedule