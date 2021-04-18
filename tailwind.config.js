const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter', ...fontFamily.sans],
            },
            colors: {
                accent: {
                    100: '#DBFF00',
                    200: '#00e887',
                    300: '#00E0F3',
                    400: '#00c4fd',
                },
                dark: '#333333',
                light: '#eeeeee',
            },
            borderWidth: {
                thin: '0.2px',
            },
            ringWidth: {
                thin: '0.2px',
            },
            maxWidth: {
                project: '21rem',
            },
            typography: (theme) => ({
                dark: {
                    css: [
                        {
                            color: theme('colors.white'),
                            '[class~="lead"]': {
                                color: theme('colors.gray.300'),
                            },
                            a: {
                                color: theme('colors.white'),
                            },
                            // p: {
                            //     color: theme('colors.white'),
                            // },
                            strong: {
                                color: theme('colors.white'),
                            },
                            'ol > li::before': {
                                color: theme('colors.light'),
                            },
                            'ul > li::before': {
                                backgroundColor: theme('colors.light'),
                            },
                            hr: {
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                            },
                            blockquote: {
                                color: theme('colors.gray.200'),
                                borderLeftColor: theme('colors.gray.600'),
                            },
                            h1: {
                                color: theme('colors.white'),
                            },
                            h2: {
                                color: theme('colors.white'),
                            },
                            h3: {
                                color: theme('colors.white'),
                            },
                            h4: {
                                color: theme('colors.white'),
                            },
                            'figure figcaption': {
                                color: theme('colors.gray.400'),
                            },
                            code: {
                                color: theme('colors.white'),
                            },
                            'a code': {
                                color: theme('colors.white'),
                            },
                            pre: {
                                color: theme('colors.gray.200'),
                                backgroundColor: theme('colors.gray.800'),
                            },
                            thead: {
                                color: theme('colors.white'),
                                borderBottomColor: theme('colors.gray.400'),
                            },
                            'tbody tr': {
                                borderBottomColor: theme('colors.gray.600'),
                            },
                        },
                    ],
                },
            }),
        },
    },
    variants: {
        extend: {
            ringColor: ['focus-visible'],
            ringOffsetColor: ['focus-visible'],
            ringOffsetWidth: ['focus-visible'],
            ringOpacity: ['focus-visible'],
            ringWidth: ['focus-visible'],
            boxShadow: ['active', 'dark'],
            margin: ['even'],
            typography: ['dark'],
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
