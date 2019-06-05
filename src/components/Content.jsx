import React from 'react'
import { Layout } from 'antd'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const { Content } = Layout

const AppContent = ({ routes }) => (
  <Content>
    <Switch>
      { renderRoutes(routes) }
    </Switch>
  </Content>
)

export default AppContent