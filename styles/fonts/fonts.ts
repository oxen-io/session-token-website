import localFont from 'next/font/local';

const AtypDisplay = localFont({
  src: [
    {
      path: '/AtypDisplay-Medium.woff2',
      style: 'normal',
    },
    {
      path: '/AtypDisplay-MediumItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-atyp-display',
  display: 'swap',
});

const AtypText = localFont({
  src: [
    {
      path: '/AtypText-Regular.woff2',
      style: 'normal',
    },
    {
      path: '/AtypText-Italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-atyp-text',
  display: 'swap',
});

export { AtypDisplay, AtypText };
