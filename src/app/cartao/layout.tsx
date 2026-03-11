
import '../virtual-card-social.css';
import '../virtual-card-contact.css';
import '../virtual-card-meeting.css';

export const metadata = {
  title: 'Cartão de Visita - FastFilms',
  description: 'Cartão de visita virtual da FastFilms.',
};

export default function CartaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-body antialiased bg-gradient-to-r from-[#121212] via-[#3a2f2f] to-[#121212] flex items-center justify-center min-h-screen p-4">
        {children}
    </div>
  );
}
