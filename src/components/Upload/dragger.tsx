import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";
// 可以检测到拖动事件的组件
interface DraggerProps {
  onFile: (files: FileList) => void;
}
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setdragOver] = useState(false);
  const classes = classNames("uploader-dragger", {
    "is-dragover": dragOver,
  });
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setdragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setdragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export default Dragger;
