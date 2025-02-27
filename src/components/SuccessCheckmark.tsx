import React from 'react';

interface SuccessCheckmarkProps {
  show: boolean;
  onAnimationEnd?: () => void;
}

export function SuccessCheckmark({ show, onAnimationEnd }: SuccessCheckmarkProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          onAnimationEnd={onAnimationEnd}
        >
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <p className="mt-4 text-white text-center font-medium animate-fade-in">
          Success!
        </p>
      </div>
    </div>
  );
}
