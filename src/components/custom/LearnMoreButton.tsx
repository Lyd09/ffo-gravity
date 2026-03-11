import React from 'react';

const LearnMoreButton: React.FC = () => {
  return (
    <button className="learn-more-button learn-more" aria-label="Ver mais">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">Ver mais</span>
    </button>
  );
};

export default LearnMoreButton;
