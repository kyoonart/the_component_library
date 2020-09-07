import React, { useContext, CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string
  /**选项是否被禁用 */
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export const MenuItemProps: FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItemProps.defaultProps = {
  disabled: false
}

MenuItemProps.displayName = 'MenuItem' // 用来判断类型

export default MenuItemProps
