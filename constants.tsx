import { CalculatorButton, ButtonType } from './types';
import { Delete, Divide, Minus, Plus, X, Equal, Hash, RotateCcw, Percent, Calculator } from 'lucide-react';
import React from 'react';

export const CALCULATOR_BUTTONS: CalculatorButton[] = [
  { label: 'AC', value: 'AC', type: ButtonType.Action, variant: 'danger' },
  { label: 'DEL', value: 'DEL', type: ButtonType.Action, variant: 'function', icon: <Delete size={20} /> },
  { label: '%', value: '%', type: ButtonType.Operator, variant: 'function', icon: <Percent size={20} /> },
  { label: '/', value: '/', type: ButtonType.Operator, variant: 'function', icon: <Divide size={24} /> },

  { label: '7', value: '7', type: ButtonType.Number },
  { label: '8', value: '8', type: ButtonType.Number },
  { label: '9', value: '9', type: ButtonType.Number },
  { label: '*', value: '*', type: ButtonType.Operator, variant: 'function', icon: <X size={24} /> },

  { label: '4', value: '4', type: ButtonType.Number },
  { label: '5', value: '5', type: ButtonType.Number },
  { label: '6', value: '6', type: ButtonType.Number },
  { label: '-', value: '-', type: ButtonType.Operator, variant: 'function', icon: <Minus size={24} /> },

  { label: '1', value: '1', type: ButtonType.Number },
  { label: '2', value: '2', type: ButtonType.Number },
  { label: '3', value: '3', type: ButtonType.Number },
  { label: '+', value: '+', type: ButtonType.Operator, variant: 'function', icon: <Plus size={24} /> },

  { label: 'AI', value: 'AI', type: ButtonType.Action, variant: 'function', icon: <SparklesIcon /> },
  { label: '0', value: '0', type: ButtonType.Number },
  { label: '.', value: '.', type: ButtonType.Number },
  { label: '=', value: '=', type: ButtonType.Action, variant: 'accent', icon: <Equal size={28} /> },
];

function SparklesIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-purple-400"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
