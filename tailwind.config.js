module.exports = {
    purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
            },
            colors: {
                accent: {
                    100: '#DBFF00',
                    200: '#00FF94',
                    300: '#00FFDF',
                },
                dark: '#333333',
                light: '#eeeeee',
            },
            borderWidth: {
                thin: '0.2px',
            },
        },
    },
    variants: {
        extend: {
            boxShadow: ['active'],
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
