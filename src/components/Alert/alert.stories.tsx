import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Alert from "./alert";
const defaultAlert = () => (
  <Alert type="danger" closable={true} description="这是一个测试case"></Alert>
);
const successAlert = () => <Alert type="success"></Alert>;
storiesOf("Alert 组件", module)
  .add("defalut Alert", defaultAlert)
  .add("success Alert", successAlert);
