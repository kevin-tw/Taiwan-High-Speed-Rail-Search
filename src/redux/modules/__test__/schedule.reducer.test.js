import schedule, {
  defaultState,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../schedule'

import {
  mockODFare,
  mockDailyTimetable
} from './mocks/data'

describe('schedule reducer', () => {
  it('should return the initial state', () => {
    expect(schedule(undefined, {})).toEqual(defaultState)
  })

  it('should handle FETCH_REQUEST', () => {
    expect(schedule({}, {
      type: FETCH_REQUEST
    })).toEqual({
      isFetching: true
    })
  })

  it('should handle FETCH_SUCCESS', () => {
    expect(schedule({}, {
      type: FETCH_SUCCESS,
      ODFare: mockODFare,
      dailyTimetable: mockDailyTimetable
    })).toEqual({
      isFetching: false,
      ODFare: mockODFare,
      dailyTimetable: mockDailyTimetable
    })
  })

  it('should handle FETCH_FAILURE', () => {
    const errorMsg = '取得資料時，發生錯誤'

    expect(schedule({}, {
      type: FETCH_FAILURE,
      error: errorMsg
    })).toEqual({
      isFetching: false,
      error: errorMsg
    })
  })
})