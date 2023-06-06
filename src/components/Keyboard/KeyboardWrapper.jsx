import React, { useCallback, useEffect, useState } from 'react'
import Keyboard from './Keyboard'

const KeyboardWrapper = ({rowEntered, onPress}) => {
    
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