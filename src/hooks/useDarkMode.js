import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
    const [enabled, setEnabled] = useLocalStorage('dark-theme', true);
    const isEnabled = typeof enabledState === 'undefined' && enabled;
    useEffect(() => {
      const className = 'dark';
      const bodyClass = window.document.documentElement.classList;
      
      isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
    }, [isEnabled])
  
    return [enabled, setEnabled];
  };
  
  export default useDarkMode;