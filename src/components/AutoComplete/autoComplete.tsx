import React, { FC, useState, ChangeEvent } from "react";
import Input, { InputProps } from "../Input/input";
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (src: string) => string[];
  onSelect?: (item: string) => void;
  value?: string;
}
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  const handleClick = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleClick(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
