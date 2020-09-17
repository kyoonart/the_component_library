import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
interface DataSourceObject {
  value: string;
}
// 交叉类型
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**返回输入建议的方法，可以拿到当前的输入 */
  fetchSuggestions: (
    src: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**点击选中建议项时触发的回调 */
  onSelect?: (item: DataSourceType) => void;
  value?: string;
  /**支持自定义渲染下拉项 */
  renderOptions?: (item: DataSourceType) => ReactElement;
}
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'escape'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const debouncedValue = useDebounce(inputValue, 500);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  // loading
  const [loading, setLoading] = useState(false);
  // 点击外部 关闭弹窗
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue); // array or promise
      // ts自动帮认出一个分支是promise 另一个是 数组
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue, fetchSuggestions]);
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("按下了");
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        highlight(-1); //重置为初始值 避免影响下一次的选择
        break;
      // 向上
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 向下
      case 40:
        highlight(highlightIndex + 1);
        break;
      // esc
      case 27:
        setSuggestions([]);
        highlight(-1);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    if (renderOptions) {
      return renderOptions ? renderOptions(item) : item.value;
    }
  };
  const generateDropdown = () => {
    return (
      <ul className="suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "item-highlighted": index === highlightIndex,
          });
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
