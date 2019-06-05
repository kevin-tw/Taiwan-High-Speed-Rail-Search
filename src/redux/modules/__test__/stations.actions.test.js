import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'

import { mockStations } from './mocks/data'

import {
  defaultState,
  fetchStations,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../stations'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(axios)

describe('stations actions', () => {
  const stationsUrl = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$select=StationID%2CStationName&$format=JSON'

  it('creates FETCH_SUCCESS when fetching data has been done', async () => {
    const store = mockStore(defaultState)
    const expectedActions = [
      { type: FETCH_REQUEST },
      { type: FETCH_SUCCESS, list: mockStations },
    ]

    mock.onGet(stationsUrl)
        .reply(200, mockStations)

    await store.dispatch(fetchStations())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates FETCH_FAILURE when fetching data has not been done', async () => {
    const store = mockStore(defaultState)
    const expectedActions = [
      { type: FETCH_REQUEST },
      { type: FETCH_FAILURE, error: '取得資料時，發生錯誤' },
    ]

    mock.onGet(stationsUrl)
        .reply(500)

    await store.dispatch(fetchStations())
    expect(store.getActions()).toEqual(expectedActions)
  })
})