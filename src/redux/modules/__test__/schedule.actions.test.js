import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'

import {
  mockODFare,
  mockDailyTimetable
} from './mocks/data'

import {
  defaultState,
  fetchSchedule,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../schedule'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(axios)

describe('stations actions', () => {
  const trainDate = '2019-06-04'
  const originStation = '1010'
  const destinationStation = '1020'
  const searchData = {
    trainDate,
    originStation,
    destinationStation
  }

  const baseURL = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR'
  const ODFareUrl = `${baseURL}/ODFare/${originStation}/to/${destinationStation}?$select=Fares&$format=JSON`
  const dailyTimetableUrl = `${baseURL}/DailyTimetable/OD/${originStation}/to/${destinationStation}/${trainDate}?$format=JSON`

  it('creates FETCH_SUCCESS when fetching data has been done', async () => {
    const store = mockStore(defaultState)
    const expectedActions = [
      { type: FETCH_REQUEST },
      { type: FETCH_SUCCESS,
        ODFare: mockODFare,
        dailyTimetable: mockDailyTimetable
      },
    ]

    mock.onGet(ODFareUrl)
        .reply(200, mockODFare)
        .onGet(dailyTimetableUrl)
        .reply(200, mockDailyTimetable)

    await store.dispatch(fetchSchedule(searchData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates FETCH_FAILURE when fetching data has not been done', async () => {
    const store = mockStore(defaultState)
    const expectedActions = [
      { type: FETCH_REQUEST },
      { type: FETCH_FAILURE, error: '取得資料時，發生錯誤' },
    ]

    mock.onGet(ODFareUrl)
        .reply(500)
        .onGet(dailyTimetableUrl)
        .reply(500)

    await store.dispatch(fetchSchedule(searchData))
    expect(store.getActions()).toEqual(expectedActions)
  })
})