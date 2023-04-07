import {useState, useEffect, useCallback } from "react";

const useAutoFocus = (gameRef) => {
    const [focusOnMe, updateState] = useState()
    useEffect(() => {
        if(gameRef.current){
        gameRef.current.focus();
        }
    }, [focusOnMe, gameRef]);
    const updateFocus = useCallback(() => updateState({}), [])
    return [ updateFocus ] 
  }
  
export default useAutoFocus