import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className }) => {
  return (
    <div className={twMerge(
      "overflow-hidden rounded-xl border bg-card text-card-foreground shadow",
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
