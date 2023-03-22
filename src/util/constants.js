export const FLIP_ANIMATION_DURATION = 1000

export const FLIP_DELAY_BETWEEN_TILE = 150

export const FULL_FLIP_WAIT = FLIP_ANIMATION_DURATION + (FLIP_DELAY_BETWEEN_TILE * 4)

export const BOUNCE_DELAY_BETWEEN_TILE = 150

export const INVALID_WAIT = 300 

export const colorScheme = {
    NavBar: {
        textLight: 'text-black',
        textDark: 'dark:text-white',
        bgDark: 'dark:bg-[#121213]',
        bgLight: 'bg-gray-300',
    },

    Game: {
        bgDark: 'dark:bg-[#121213]',
        // bgLight: 'bg-[#145266]'
        bgLight: 'bg-gray-300'
    },

    Box: {
        boxDark: {
            empty: 'dark:bg-EMPTY',
            correct : 'dark:bg-CORRECT',
            present : 'dark:bg-PRESENT',
            absent : 'dark: bg-ABSENT', 
        },
        boxLight: {
            empty: 'bg-EMPTY',
            correct : 'bg-white',
            present : 'bg-PRESENT',
            absent : 'bg-ABSENT',
        },
        textDark: 'dark:text-white',
        textLight: 'text-black' //TODO: Change Text to black after
    }
}