import availableSeats, {
  defaultState,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../availableSeats'

import {
  mockODFare,
  mockDailyTimetable,
  mockAvailableSeats
} from './mocks/data'

describe('availableSeats reducer', () => {
  it('should return the initial state', () => {
    expect(availableSeats(undefined, {})).toEqual(defaultState)
  })

  it('should handle FETCH_REQUEST', () => {
    expect(availableSeats({}, {
      type: FETCH_REQUEST
    })).toEqual({
      isFetching: true
    })
  })

  it('should handle FETCH_SUCCESS', () => {
    expect(availableSeats({}, {
      type: FETCH_SUCCESS,
      ODFare: mockODFare,
      dailyTimetable: mockDailyTimetable,
      availableSeats: mockAvailableSeats
    })).toEqual({
      isFetching: false,
      ODFare: mockODFare,
      dailyTimetable: mockDailyTimetable,
      availableSeats: mockAvailableSeats
    })
  })

  it('should handle FETCH_FAILURE', () => {
    const errorMsg = '取得資料時，發生錯誤'

    expect(availableSeats({}, {
      type: FETCH_FAILURE,
      error: errorMsg
    })).toEqual({
      isFetching: false,
      error: errorMsg
    })
  })
})