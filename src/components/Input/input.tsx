import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
type InputSize = "lg" | "sm";
// Omit用来忽略InputHTMLAttributes里的size 这样就不会产生冲突
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**设置 Input 的禁用 */
  disabled?: boolean;
  /**设置 Input 的尺寸 */
  size?: InputSize;
  /**设置 Input 的图标 */
  icon?: IconProp;
  /**在 Input 之前放置元素 */
  prepend?: string | ReactElement;
  /**在 Input 之后放置元素 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 表单元素input
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'my_components'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
  // 取出各种属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props;
  // 根据属性计算classes
  const classes = classNames("input-wrapper", className, {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  // value 没有传值时默认为空的字符串
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    } else {
      return value;
    }
  };
  // value 和 defalueValue不能同时存在
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }
  return (
    // 根据属性判断是否需要添加特定的节点
    <>
      <div className={classes} style={style}>
        {prepend && <div className="in-input-group-prepend">{prepend}</div>}
        {icon && (
          <div className="icon-wrapper">
            <Icon icon={icon} title={`title-${icon}`}></Icon>
          </div>
        )}
        <input
          className="input-inner"
          disabled={disabled}
          {...restProps}
        ></input>
        {append && <div className="in-input-group-append">{append}</div>}
      </div>
    </>
  );
};
export default Input;
