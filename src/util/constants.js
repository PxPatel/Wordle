export const FLIP_ANIMATION_DURATION = 1000

export const FLIP_DELAY_BETWEEN_TILE = 150

export const FULL_FLIP_WAIT = FLIP_ANIMATION_DURATION + (FLIP_DELAY_BETWEEN_TILE * 4)

export const BOUNCE_ANIMATION_DURATION = 1000

export const BOUNCE_DELAY_BETWEEN_TILE = 150

export const FULL_BOUNCE_WAIT = BOUNCE_ANIMATION_DURATION + (BOUNCE_DELAY_BETWEEN_TILE * 4)

export const INVALID_WAIT = 300 

export const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];


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
            text: 'dark:text-white',
            emptyBorder: 'dark:border-[#565758]',
            filledBorder: 'dark:border-[#3a3a3c]',
        },
        boxLight: {
            // empty: 'bg-[#E5BF9E]',
            empty: 'bg-[#d5cfe1]',
            correct : 'bg-CORRECT',
            present : 'bg-PRESENT',
            absent : 'bg-ABSENT',
            text: 'text-black',        
            emptyBorder: 'border-[#787891]',
            filledBorder: 'border-[#49495a]',
        },
    },

    Modal: {
        bgLight: 'bg-[#d3b8a7]/[.95] ',
        bgDark: 'dark:bg-[#546776]/[0.95]',
        textLight: 'text-white',
        textDark: 'dark:text-white',
    },

    Keyboard: {
        tileColors: {
            correct: 'bg-CORRECT dark:bg-CORRECT',
            present: 'bg-PRESENT dark:bg-PRESENT',
            absent: 'bg-[#d5cfe1] dark:bg-ABSENT',
        },
        textLight: '',
        textDark: '',
    }
}