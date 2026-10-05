import './globals.css';
import CursorGlow from '@/components/CursorGlow';

const SITE_URL = 'https://smasduq.xyz';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Smasduq — Software Developer, Founder & Product Builder',
    template: '%s | Smasduq',
  },
  description:
    'Smasduq builds software and products — video platforms, music apps, developer tools, and Linux utilities, shipped and live.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Smasduq',
    title: 'Smasduq — Software Developer, Founder & Product Builder',
    description:
      'I build software, experiment with ideas, and turn projects into real products.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smasduq — Software Developer, Founder & Product Builder',
    description:
      'I build software, experiment with ideas, and turn projects into real products.',
  },
  icons: { icon: '/icon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
