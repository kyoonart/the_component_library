import { RefObject, useEffect} from 'react'

function useClickOutside(ref: RefObject<HTMLDivElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      // 点击到组件外面时
      handler()
    }
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside