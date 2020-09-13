import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLDivElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 如果是弹窗区域或者包含弹窗区域，则不处理；反之，则关闭弹窗
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      // 点击到组件外面时
      handler();
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
