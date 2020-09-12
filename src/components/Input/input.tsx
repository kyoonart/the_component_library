import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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
export const Input: FC<InputProps> = (props) => {
  // 取出各种属性
  // 根据属性计算props
  return (
    // 根据属性判断是否需要添加特定的节点
    <></>
  );
};
