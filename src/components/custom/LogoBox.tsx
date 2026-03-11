import React from 'react';
import Image from 'next/image';

const LogoBox: React.FC = () => {
  return (
    <div className="card" aria-label="Logotipo da Empresa">
      <div className="bg">
        <Image
          src="/index/logoFF.svg"
          alt="Logotipo da Empresa"
          width={250}
          height={320}
          className="object-contain"
          data-ai-hint="company logo"
          priority
        />
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default LogoBox;
