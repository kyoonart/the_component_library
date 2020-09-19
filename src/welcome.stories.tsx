import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("welcome page", module).add(
  "欢迎使用",
  () => {
    return (
      <div>
        <h1>欢迎使用我的组件</h1>
        <h4>安装试试~</h4>
        <code>npm install escape --save</code>
      </div>
    );
  },
  { info: { disable: true } }
);
