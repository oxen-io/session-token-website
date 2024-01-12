import Script from "next/script";

export const metadata = {
  title: "Session Token",
  description: "Session Token",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/Fonts.css" rel="stylesheet" type="text/css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
