import React, { useState } from "react";
import classNames from "classnames";
export type AlertType = "success" | "default" | "danger" | "waring";
interface AlertProps {
  className?: string;
  /** 设置提示框title*/
  title?: string;
  /**设置提示框的类型 */
  type?: AlertType;
  /**设置提示框的描述 */
  description?: string;
  /**
   设置提示框的关闭回调函数
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   设置提示框的默认关闭
   */
  closable?: boolean;
}
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'escape'
 * ~~~
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    title,
    description = "默认描述",
    type,
    closable,
    onClose,
  } = props;
  const [closed, setClosed] = useState(false);
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClose) {
      onClose(e);
    }
    setClosed(true);
  };
  const closeIcon = closable ? (
    <button onClick={handleClose} className="alert-close">
      <span className="alert-icon">关</span>
    </button>
  ) : null;
  return !closed ? (
    <div className={classes}>
      <span className="alert-title">{title}</span>
      <span className="alert-desc">{description}</span>
      {closeIcon}
    </div>
  ) : null;
};
Alert.defaultProps = { type: "default", closable: false };
export default Alert;
