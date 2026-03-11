import type { Metadata } from 'next';
import './globals.css';
import './buttons.css';
import './contact-button.css';
import './sparkle-button.css';
import './portfolio-button.css';
import { Toaster } from 'sonner';
import CustomCursor from '@/components/custom/CustomCursor';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fastfilmsoficial.com.br'),
  title: 'FastFilms',
  description: 'O visual chama, o som envolve, mas a edição é quem cria o ritmo e a narrativa. Audiovisual é a magia que une o que vemos e ouvimos.',
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png?v=1', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png?v=1', sizes: '16x16', type: 'image/png' },
      { url: '/index/LOGO-ICON.svg?v=1', type: 'image/svg+xml' },
      { url: '/favicon/android-chrome-512x512.png?v=1', sizes: '512x512', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png?v=1', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico?v=1',
    apple: [
      { url: '/favicon/apple-touch-icon.png?v=1', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'FastFilms',
    description: 'O visual chama, o som envolve, mas a edição é quem cria o ritmo e a narrativa. Audiovisual é a magia que une o que vemos e ouvimos.',
    siteName: 'FastFilms',
    images: [
      {
        url: '/index/cartao/logo.png',
        width: 800,
        height: 800,
        alt: 'FastFilms Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastFilms',
    description: 'O visual chama, o som envolve, mas a edição é quem cria o ritmo e a narrativa. Audiovisual é a magia que une o que vemos e ouvimos.',
    images: ['/index/cartao/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased overflow-x-hidden min-h-screen bg-[#121212]">
        <TooltipProvider>
          <CustomCursor />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
