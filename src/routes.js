import React from 'react'
import { Redirect } from 'react-router'

import AvailableSeats from './containers/AvailableSeats'
import Schedule from './containers/Schedule'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/schedule" />,
  },
  {
      path: '/schedule',
      text: '指定日期列車查詢',
      exact: true,
      component: Schedule,
  },
  {
      path: '/availableSeats',
      text: '剩餘座位查詢',
      exact: true,
      component: AvailableSeats,
  },
]

export default routes