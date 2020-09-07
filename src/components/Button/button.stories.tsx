import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

const buttonWithSize = () => (
  <div>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </div>
);

const buttonWithType = () => (
  <div>
    <Button btnType="danger">danger button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="link" target="_blank" href="https://www.baidu.com/">
      link button
    </Button>
  </div>
);

storiesOf("Button 组件", module)
  // .addDecorator(CenterDecorator)
  // .addDecorator(withInfo)
  // .addParameters({
  //   info: {
  //     text: `### 这是一个组件
  //     ~~~js
  //     const a = 1
  //     ~~~
  //     `,
  //     inline: true
  //   }
  // })
  .add("Button", defaultButton)
  // .add('不同尺寸的 Button', buttonWithSize, {info: {inline: false}})
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType);
