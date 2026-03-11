
import MainLayout from '../MainLayout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-8">
            <Link href="/#contato" className="flex items-center gap-2 text-white hover:text-primary transition-colors w-fit">
                <ArrowLeft className="h-5 w-5" />
                <span>Voltar</span>
            </Link>
        </div>
        {children}
    </MainLayout>
  );
}
