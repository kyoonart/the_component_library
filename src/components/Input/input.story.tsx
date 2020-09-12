import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Input } from "./input";

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
