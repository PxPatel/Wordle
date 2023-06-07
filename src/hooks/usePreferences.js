import useLocalStorage from "./useLocalStorage"


//FIXME: Make this work so preferences are aggregated and easier to use globally
const usePreferences = () => {

    const [preferencesData, setPreferenceData]= useLocalStorage('user-preferences', {
        'isKeyboardActive': true,
        'onHardMode': false,
        'theme': 'dark',
    }, true)

    return {
        'preferencesData': preferencesData,
        'setPreferenceData': setPreferenceData,
    }
}

export default usePreferences