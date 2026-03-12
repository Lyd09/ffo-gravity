'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Contact } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/#equipe', label: 'Sobre' },
    { href: '/#servicos', label: 'Serviços' },
    { href: '/#equipamentos', label: 'Equipamentos' },
    { href: '/#associados', label: 'Associados' },
    { href: '/#contato', label: 'Contato' },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-r from-[#121212] via-[#3a2f2f] to-[#121212]">
        <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-4 max-w-[1440px] mx-auto w-full">
              {/* Left side */}
              <div className="flex items-center gap-4 flex-1">
                <Link href="/" className="w-[60px] h-[60px] flex-shrink-0">
                  <Image
                    alt="Red diamond shaped logo"
                    className="w-full h-full object-contain"
                    height={60}
                    src="/index/LOGO-ICON.svg"
                    width={60}
                    priority
                    data-ai-hint="diamond logo"
                  />
                </Link>
              </div>

              {/* Center (Desktop Navigation) */}
              <nav className="hidden md:flex items-center justify-center text-white text-sm font-semibold tracking-wide uppercase flex-1">
                <div className="flex items-center space-x-12">
                  {navLinks.map((link) => (
                    <Link key={link.label} className="relative group" href={link.href}>
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-in-out"></span>
                    </Link>
                  ))}
                </div>
              </nav>
              
              {/* Right side (for spacing) and Mobile Menu */}
              <div className="flex items-center justify-end gap-4 flex-1">
                <div className="md:hidden">
                  <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6 text-white" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-background border-r-0 w-3/4">
                      <nav className="flex flex-col items-center justify-center h-full text-white text-xl font-semibold tracking-wide uppercase">
                        {navLinks.map((link, index) => (
                          <div key={link.label} className="w-full text-center">
                            <Link
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="relative group block py-4"
                            >
                              {link.label}
                              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-in-out"></span>
                            </Link>
                            {index < navLinks.length - 1 && <Separator className="bg-border/50" />}
                          </div>
                        ))}
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
        </header>
        <main className="flex-1">
            {children}
        </main>
        <footer className="bg-[#121212] border-t border-border/50 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center text-center md:items-center gap-16 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/index/FF-SITE-ICON.svg"
                alt="FastFilms Logo"
                width={60}
                height={60}
                className="mb-2"
                data-ai-hint="logo"
              />
              <p className="font-bold font-body">FastFilms</p>
              <p className="font-normal font-body text-sm text-muted-foreground mt-1 max-w-[200px] leading-snug">
                Cada momento<br />Merece um bom take!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-12 text-center md:text-left">
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Redes Sociais</h4>
                <div className="flex items-center gap-4">
                  <a href="https://wa.me/5531972208560?text=Olá, equipe da FastFilms! Vim pelo site de vocês e gostaria de solicitar um orçamento para o meu projeto." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="1.6em" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/fastfilmsoficial.com.br/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" fill="currentColor">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/fastfilmsoficial/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" fill="currentColor">
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@FastFilms_oficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 576 512" fill="currentColor">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Cartão</h4>
                <Link href="/cartao" passHref>
                  <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary px-2">
                    <Contact className="mr-2 h-5 w-5" />
                    Cartão de Visita
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Associados</h4>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary px-2">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Ferramenta Interna
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Acesso Restrito</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ferramenta é de uso exclusivo para associados e colaboradores autorizados. Você será redirecionado para uma página de login.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => window.open('https://projetex.netlify.app/', '_blank')}>
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-border/50" />
          <div className="text-center text-muted-foreground text-sm flex justify-center items-center gap-4">
            <span>© {new Date().getFullYear()} FastFilms. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
