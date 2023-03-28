import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
    const [enabled, setEnabled] = useLocalStorage('dark-theme', true);
    const isEnabled = typeof enabledState === 'undefined' && enabled;
    console.log('changes ' + enabled)
    useEffect(() => {
      const className = 'dark';
      const bodyClass = window.document.documentElement.classList;
  
      console.log(isEnabled)
      isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
    }, [isEnabled]);
  
    return [enabled, setEnabled];
  };
  
  export default useDarkMode;