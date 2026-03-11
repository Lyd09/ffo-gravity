import React from 'react';
import { ArrowRight } from 'lucide-react';

const PortfolioButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="portfolio-btn group" {...props}>
        <span className="flex items-center justify-center">
            {children}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
        </span>
    </button>
  );
};

export default PortfolioButton;
