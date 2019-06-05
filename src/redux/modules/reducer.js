import { combineReducers } from  'redux'

import availableSeats from './availableSeats'
import schedule from './schedule'
import stations from './stations'

export default combineReducers({
    availableSeats,
    schedule,
    stations,
})