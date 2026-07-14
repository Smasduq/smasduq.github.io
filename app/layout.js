import './globals.css';
import CursorGlow from '@/components/CursorGlow';

export const metadata = {
  metadataBase: new URL('https://smasduq.github.io'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Ambient cursor glow — auto-disabled on touch devices */}
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
