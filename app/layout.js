import './globals.css';

export const metadata = {
  metadataBase: new URL('https://smasduq.github.io'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        Space Grotesk — body text: geometric, modern, very legible
        Syne          — headings: bold, distinctive display face with personality
        Both loaded via globals.css @import; no extra link needed here.
      */}
      <body>{children}</body>
    </html>
  );
}
