import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>link 1</MenuItem>
      <MenuItem disabled>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>菜单1</MenuItem>
        <MenuItem>菜单2</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
  .submenu {
    display: none;
  }
  .submenu.menu-opened {
    display: block;
  }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile()) // 插入css
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('link 1')
    disabledElement = wrapper.getByText('link 2')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4) // :scope代表元素本身
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('link 3')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on submenu', async () => {
    expect(wrapper.queryByText('菜单1')).toBeNull() // 如果不插入css，会一直显示。被transition组件包装后，子组件一开始是不存在的

    // 鼠标移入显示元素
    const dropdownElement = wrapper.getByText('下拉菜单')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('菜单1')).toBeVisible() // 回调含异步操作
    })

    // 点击菜单
    fireEvent.click(wrapper.getByText('菜单1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    // 鼠标移除隐藏元素
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('菜单1')).not.toBeVisible() // 回调含异步操作
    })
  })
})
