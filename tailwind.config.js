/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';


export default {
    content: [
        './index.html',
        './account/auth.html',
        './profile/index.html',
        './profile/create.html',
        './listing/singleListing.html',
        './src/**/*.{html,js}',
    ],
    theme: {
        extend: {
            fontFamily: {
                parkinsans: ['Parkinsans', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            colors: {
                customBlue: '#2a3643',
                customDark: '#1d232a',
                customWhite: '#ffffffd6',
                customOrange: '#db7a24'
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: false,
        darkTheme: "light",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        themeRoot: ":root",
    },
};