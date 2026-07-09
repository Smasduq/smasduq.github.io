import './globals.css';

export const metadata = {
  metadataBase: new URL('https://smasduq.github.io'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
