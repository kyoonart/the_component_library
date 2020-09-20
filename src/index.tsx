// 添加图标库
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
library.add(fas);
export { default as Button } from "./components/Button";
export { default as Menu } from "./components/Menu";
export { default as AutoComplete } from "./components/AutoComplete";
export { default as Icon } from "./components/Icon/icon";
export { default as Input } from "./components/Input";
export { default as Progress } from "./components/Progress/progress";
export { default as Transition } from "./components/Transition/transition";
export { default as Upload } from "./components/Upload";
export { default as Alert } from "./components/Alert";
ReactDOM.render(<App />, document.getElementById("root"));
