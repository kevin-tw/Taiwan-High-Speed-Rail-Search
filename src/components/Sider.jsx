import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const { Sider } = Layout

const AppSider = withRouter(({ links = [], location }) => (
  <Sider
    width={200}
    style={{ background: '#fff' }}
    breakpoint="sm"
    collapsedWidth="0"
  >
    <Menu
      mode="inline"
      selectedKeys={[ location.pathname ]}
      style={{ borderRight: 0 }}
    >
      {links.map(link => link.text && (
        <Menu.Item key={link.path}>
          <Link to={link.path}>
            { link.text }
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
))

export default AppSider