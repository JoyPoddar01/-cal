import React from 'react';

export enum ButtonType {
  Number = 'number',
  Operator = 'operator',
  Action = 'action',
  Scientific = 'scientific'
}

export interface CalculatorButton {
  label: string;
  value: string;
  type: ButtonType;
  span?: number; // Column span
  variant?: 'default' | 'accent' | 'function' | 'danger';
  icon?: React.ReactNode;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface AiResponse {
  answer: string;
  explanation: string;
}