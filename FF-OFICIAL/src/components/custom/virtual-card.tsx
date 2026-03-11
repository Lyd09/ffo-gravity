'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Linkedin, Instagram, Clapperboard, Calendar } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);


const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/fastfilmsoficial.com.br/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/fastfilmsoficial/?viewAsMember=true', label: 'LinkedIn' },
];

const contactActions = [
  { icon: WhatsAppIcon, label: 'WhatsApp', href: `https://wa.me/5531972208560?text=${encodeURIComponent('Olá! Vi seu cartão de visitas e gostaria de saber mais.')}` },
  { icon: Mail, label: 'Email', href: 'mailto:fastfilmsoficial@gmail.com' },
  { icon: Clapperboard, label: 'Portfolio', href: 'https://fastfilmsoficial.com.br/portfolio' },
];

const Particle = ({style}: {style: React.CSSProperties}) => (
    <svg className="particle" style={style} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export default function VirtualCard() {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
        const newParticles = Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} style={{
                '--x': Math.random(),
                '--y': Math.random(),
                '--size': Math.random() * 0.5 + 0.25,
                '--duration': Math.random() * 1.5 + 0.5,
                '--delay': Math.random() * -2,
                '--origin-x': Math.random() > 0.5 ? '50%' : '-50%',
                '--origin-y': Math.random() > 0.5 ? '50%' : '-50%',
            } as React.CSSProperties} />
        ));
        setParticles(newParticles);
    }
  }, [isClient]);


  return (
    <Card 
      className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="relative h-48 bg-gradient-to-b from-card to-[hsl(var(--primary)_/_0.3)]">
        <Image
          src="/index/cartao/wallpaper.png"
          alt="Abstract background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-70"
          data-ai-hint="abstract background"
        />
      </div>
      <CardContent className="p-6 text-center -mt-20">
        <Avatar className="w-36 h-36 mx-auto border-4 border-card shadow-lg">
          <AvatarImage src="/index/cartao/logo.png" data-ai-hint="company logo" />
          <AvatarFallback>FF</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mt-4 tracking-wide text-foreground">
          FastFilms
        </h1>
        <p className="text-foreground/80 font-medium tracking-wider uppercase">Produtora Audiovisual</p>
        <p className="text-muted-foreground mt-2 italic text-sm">Cada momento merece um bom take!</p>
        
        <Separator className="my-6" />

        <div className="flex justify-center my-6">
          <Link href="/">
            <Image
              src="/index/cartao/SITE FF QRCODE.svg"
              alt="QR Code para o site da FastFilms"
              width={150}
              height={150}
              className="rounded-lg [filter:drop-shadow(0_4px_6px_hsl(var(--primary)))]"
              data-ai-hint="qr code"
            />
          </Link>
        </div>

        <div className="contact-actions">
          {contactActions.map(action => (
            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
              <action.icon />
              <span>{action.label}</span>
            </a>
          ))}
        </div>

        <div className="button-container mt-6">
          {socialLinks.map(social => (
            <a 
              key={social.label} 
              href={social.href} 
              aria-label={social.label} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <social.icon className="w-5 h-5 btn-svg" />
            </a>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-center">
            <a href="https://calendly.com/fastfilmsoficial" target="_blank" rel="noopener noreferrer" className="sp">
              <div className="sparkle-button">
                <span className="spark"></span>
                <span className="backdrop"></span>
                <div className="sparkle">
                  <Calendar />
                </div>
                <span className="text">Marque uma reunião!</span>
              </div>
              <div className="bodydrop"></div>
              <span aria-hidden="true" className="particle-pen">
                {particles}
              </span>
            </a>
        </div>
      </CardContent>
    </Card>
  );
}
