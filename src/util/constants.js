export const FLIP_ANIMATION_DURATION = 1000

export const FLIP_DELAY_BETWEEN_TILE = 150

export const FULL_FLIP_WAIT = FLIP_ANIMATION_DURATION + (FLIP_DELAY_BETWEEN_TILE * 4)

export const BOUNCE_ANIMATION_DURATION = 1000

export const BOUNCE_DELAY_BETWEEN_TILE = 150

export const FULL_BOUNCE_WAIT = BOUNCE_ANIMATION_DURATION + (BOUNCE_DELAY_BETWEEN_TILE * 4)

export const INVALID_WAIT = 300 

export const colorScheme = {

    //A nice blue color = bg-[#145266]

    NavBar: {
        textLight: 'text-black',
        textDark: 'dark:text-white',
        bgDark: 'dark:bg-[#121213]',
        // bgLight: 'bg-[#EED5BF]',
        bgLight: 'bg-[#d5cfe1]'
        //border-b-[#568ce3]
    },

    Game: {
        bgDark: 'dark:bg-[#121213]',
        // bgLight: 'bg-[#145266]'
        // bgLight: 'bg-[#EED5BF]'
        bgLight: 'bg-[#d5cfe1]'
    },

    Box: {
        boxDark: {
            empty: 'dark:bg-EMPTY',
            correct : 'dark:bg-CORRECT',
            present : 'dark:bg-PRESENT',
            absent : 'dark:bg-ABSENT', 
        },
        boxLight: {
            // empty: 'bg-[#E5BF9E]',
            empty: '',
            correct : 'bg-CORRECT',
            present : 'bg-PRESENT',
            absent : 'bg-ABSENT',
        },
        textDark: 'dark:text-white',
        textLight: 'text-black',

        emptyBorderLight: 'border-[#787891]',
        filledBorderLight: 'border-[#49495a]',
        emptyBorderDark: 'dark:border-[#565758]',
        filledBorderDark: 'dark:border-[#3a3a3c]',
    },

    Modal: {
        bgLight: 'bg-[#D77A70]/[.95] ',
        bgDark: 'dark:bg-[#1D3549]/[0.95]',
        textLight: 'text-white',
        textDark: 'dark:text-white',

    }
}