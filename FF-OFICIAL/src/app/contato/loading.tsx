'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20); // Ajuste o intervalo para controlar a velocidade

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-[#121212] via-[#3a2f2f] to-[#121212] text-white">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm px-4">
        <Image
            src="/index/LOGO-ICON.svg"
            alt="FastFilms Logo"
            width={80}
            height={80}
            priority
            data-ai-hint="logo"
        />
        <div className="text-center">
            <p className="text-lg font-semibold tracking-wider text-white mb-2">
            Carregando assistente inteligente...
            </p>
            <p className="text-sm text-muted-foreground">
            Estamos preparando tudo para você.
            </p>
        </div>
        <Progress value={progress} className="w-full h-2 bg-secondary" />
      </div>
    </div>
  );
}
