import React from 'react';
import Image from 'next/image';

const DroneIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Image
      src="/index/drone.svg"
      alt="Drone icon"
      width={32}
      height={32}
      className={className}
      data-ai-hint="drone"
    />
  );
};

export default DroneIcon;
