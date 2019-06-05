import stations, {
  defaultState,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../stations'

import { mockStations } from './mocks/data'

describe('stations reducer', () => {
  it('should return the initial state', () => {
    expect(stations(undefined, {})).toEqual(defaultState)
  })

  it('should handle FETCH_REQUEST', () => {
    expect(stations({}, {
      type: FETCH_REQUEST
    })).toEqual({
      isFetching: true
    })
  })

  it('should handle FETCH_SUCCESS', () => {
    expect(stations({}, {
      type: FETCH_SUCCESS,
      list: mockStations
    })).toEqual({
      isFetching: false,
      list: mockStations
    })
  })

  it('should handle FETCH_FAILURE', () => {
    const errorMsg = '取得資料時，發生錯誤'

    expect(stations({}, {
      type: FETCH_FAILURE,
      error: errorMsg
    })).toEqual({
      isFetching: false,
      error: errorMsg
    })
  })
})