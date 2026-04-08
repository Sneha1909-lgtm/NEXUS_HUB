import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, className }) => {
  return (
    <span className={twMerge(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
