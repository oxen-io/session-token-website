export const metadata = {
  title: "Session Token",
  description: "Session Token",
}

import { AtypDisplay, AtypText } from '../fonts/fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${AtypDisplay.variable} ${AtypText.variable}`}>
      <body>{children}</body>
    </html>
  );
}
