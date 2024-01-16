import localFont from 'next/font/local'

const AtypDisplay = localFont({
    src: [
        {
            path: '/AtypDisplay-Medium.woff2',
        },
    ],
    variable: '--font-atyp-display',
    display: 'swap',
})

const AtypText = localFont({
    src: [
        {
            path: '/AtypText-Regular.woff2',
        },
    ],
    variable: '--font-atyp-text',
    display: 'swap',
})

export { AtypDisplay, AtypText }
