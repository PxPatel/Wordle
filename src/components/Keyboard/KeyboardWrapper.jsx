import React, { useCallback, useEffect, useState } from 'react'
import Keyboard from './Keyboard'

const KeyboardWrapper = ({rowEntered, onPress}) => {
    
    //TODO: Try to either bring all the logic in /Keyboard into the Wrapper
    //Use a array prop into Keyboard

    //TODO: Use useMemo() in Keyboard and put the entire return statement in it
    //Shift all this into Keyboard

    //TODO: Either continue with the HOC design, or commit to each file containing all relavant logic

    const [letterPressed, setLetterPressed] = useState(null)
    
    useEffect(() => {
        letterPressed && onPress({key: letterPressed})
        setLetterPressed(null)
    }, [letterPressed, onPress])

    const getLetterPressed = useCallback(({key}) => {
        setLetterPressed(key)
    }, [])

  return (
        <Keyboard 
        rowEntered={rowEntered}
        onPress={getLetterPressed}
        />
  )
}

export default KeyboardWrapper