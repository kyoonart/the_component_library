import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload from "./upload";
const SimpleComplete = () => {
  return <Upload action="http://jsonplaceholder.typicode.com/posts" />;
};
