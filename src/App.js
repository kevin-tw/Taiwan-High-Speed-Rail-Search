import React from 'react'
import { Layout } from 'antd'

import Content from './components/Content'
import Header from './components/Header'
import Sider from './components/Sider'

import routes from './routes'

import './App.css'

const App = () => (
  <Layout style={{ height:"100vh" }}>
    <Header />
    <Layout>
      <Sider links={routes.map(route => ({ path: route.path, text: route.text }))} />
      <Content routes={routes} />
    </Layout>
  </Layout>
)

export default App