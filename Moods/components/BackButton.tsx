import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function BackButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}