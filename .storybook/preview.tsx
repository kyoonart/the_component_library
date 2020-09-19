import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import "./fix.scss";
import "../src/styles/index.scss";

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示页面</h3>
    {storyFn()}
  </div>
);

addParameters({
  info: { inline: true, header: false },
});
addDecorator(storyWrapper);
addDecorator(withInfo);

const loaderFn = () => {
  return [
    require("../src/welcome.stories.tsx"),
    require("../src/components/Button/button.stories.tsx"),
    require("../src/components/Menu/menu.stories.tsx"),
    require("../src/components/Input/input.stories.tsx"),
    require("../src/components/AutoComplete/autoComplete.stories.tsx"),
    require("../src/components/Upload/upload.stories.tsx"),
  ];
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
