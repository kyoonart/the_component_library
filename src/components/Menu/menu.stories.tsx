import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const defaultMenu = () => (
  <Menu
    defaultIndex="2"
    onSelect={action('selected')}
  >
    <MenuItem>link 1</MenuItem>
    <MenuItem disabled>link 2</MenuItem>
    <MenuItem>link 3</MenuItem>
    <SubMenu title="下拉菜单">
      <MenuItem>菜单1</MenuItem>
      <MenuItem>菜单2</MenuItem>
    </SubMenu>
  </Menu>
)

const menuWithVertical = () => (
  <div>
    <Menu
      mode="vertical"
      onSelect={action('selected')}
    >
      <MenuItem>link 1</MenuItem>
      <MenuItem disabled>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>菜单1</MenuItem>
        <MenuItem>菜单2</MenuItem>
      </SubMenu>
      <SubMenu title="下拉菜单2">
        <MenuItem>菜单11</MenuItem>
        <MenuItem>菜单22</MenuItem>
      </SubMenu>
    </Menu>
  </div>
)

const menuWithDefaultOpen = () => (
  <div>
    <Menu
      mode="vertical"
      onSelect={action('selected')}
      defaultOpenSubMenus={['3']}
    >
      <MenuItem>link 1</MenuItem>
      <MenuItem disabled>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>菜单1</MenuItem>
        <MenuItem>菜单2</MenuItem>
      </SubMenu>
      <SubMenu title="下拉菜单2">
        <MenuItem>菜单11</MenuItem>
        <MenuItem>菜单22</MenuItem>
      </SubMenu>
    </Menu>
  </div>
)

storiesOf('Menu 组件', module)
  .add('Menu', defaultMenu)
  .add('纵向的 Menu', menuWithVertical)
  .add('默认展开的纵向的 Menu', menuWithDefaultOpen)
