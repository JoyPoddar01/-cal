import React, { useEffect, useRef } from 'react';

interface DisplayProps {
  expression: string;
  result: string;
  isAiThinking?: boolean;
}

const Display: React.FC<DisplayProps> = ({ expression, result, isAiThinking }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to end of result if it's long
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollLeft = resultRef.current.scrollWidth;
    }
  }, [result]);

  return (
    <div className="w-full bg-calc-display rounded-3xl p-6 mb-6 flex flex-col justify-end items-end min-h-[160px] shadow-inner relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
      
      {/* Expression History / Current Equation */}
      <div className="text-calc-secondary text-lg font-mono mb-2 h-6 w-full text-right overflow-hidden whitespace-nowrap overflow-ellipsis">
        {expression}
      </div>

      {/* Main Result */}
      <div 
        ref={resultRef}
        className={`w-full text-right font-light tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide transition-colors duration-300 ${
          isAiThinking ? 'text-calc-accent animate-pulse' : 'text-white'
        }`}
        style={{ fontSize: result.length > 10 ? '2.5rem' : '4rem' }}
      >
        {isAiThinking ? 'Calculating...' : (result || '0')}
      </div>
    </div>
  );
};

export default Display;
