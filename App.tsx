import React, { useState, useCallback, useEffect } from 'react';
import { History } from 'lucide-react';
import Display from './components/Display';
import Button from './components/Button';
import AiModal from './components/AiModal';
import { CALCULATOR_BUTTONS } from './constants';
import { HistoryItem } from './types';

const App: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  
  // Handle calculations safely
  const calculateResult = useCallback((expr: string): string => {
    try {
      // Basic sanitization: only allow numbers and basic operators
      const sanitized = expr.replace(/[^0-9+\-*/().%]/g, '');
      if (!sanitized) return '';
      
      // Handle percentage
      const processed = sanitized.replace(/(\d+)%/g, '($1/100)');

      // Use Function constructor for a safer eval alternative (still need care)
      // eslint-disable-next-line no-new-func
      const func = new Function(`"use strict"; return (${processed})`);
      const val = func();
      
      if (!isFinite(val) || isNaN(val)) return 'Error';
      
      // Format number to avoid long decimals
      return String(Math.round(val * 100000000) / 100000000);
    } catch (e) {
      return 'Error';
    }
  }, []);

  const handleButtonClick = (value: string) => {
    // 1. Clear All
    if (value === 'AC') {
      setExpression('');
      setResult('');
      return;
    }

    // 2. Delete last char
    if (value === 'DEL') {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    // 3. Calculate
    if (value === '=') {
      if (!expression) return;
      const finalResult = calculateResult(expression);
      setResult(finalResult);
      
      // Add to history if valid
      if (finalResult !== 'Error') {
        setHistory(prev => [
          {
            id: Date.now().toString(),
            expression: expression,
            result: finalResult,
            timestamp: Date.now()
          },
          ...prev.slice(0, 9) // Keep last 10
        ]);
      }
      return;
    }

    // 4. Open AI Modal
    if (value === 'AI') {
      setIsAiModalOpen(true);
      return;
    }

    // 5. Standard Input
    // Prevent multiple operators in a row (e.g., ++, **), replace the last one
    const operators = ['+', '-', '*', '/', '%'];
    if (operators.includes(value)) {
      if (operators.includes(expression.slice(-1))) {
        setExpression(prev => prev.slice(0, -1) + value);
        return;
      }
      // If result exists and we hit an operator, start new expression with result
      if (result && result !== 'Error') {
        setExpression(result + value);
        setResult(''); // Clear result visual but keep logic flow
        return;
      }
    }

    // If we just calculated and type a number, start fresh
    if (result && !operators.includes(value)) {
      setExpression(value);
      setResult('');
      return;
    }

    setExpression((prev) => prev + value);
  };

  const handleAiSolve = (aiResult: string) => {
    // AI returns a clean number or short string
    // We treat it as if the calculation just finished
    setExpression('');
    setResult(aiResult);
    setHistory(prev => [
      {
        id: Date.now().toString(),
        expression: 'AI Solution',
        result: aiResult,
        timestamp: Date.now()
      },
      ...prev.slice(0, 9)
    ]);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/[0-9]/.test(key)) handleButtonClick(key);
      if (['+', '-', '*', '/', '.', '%'].includes(key)) handleButtonClick(key);
      if (key === 'Enter') {
        e.preventDefault();
        handleButtonClick('=');
      }
      if (key === 'Backspace') handleButtonClick('DEL');
      if (key === 'Escape') handleButtonClick('AC');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, result]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      
      <div className="relative w-full max-w-sm">
        
        {/* Main Calculator Body */}
        <div className="bg-calc-bg p-6 rounded-[2.5rem] shadow-2xl border border-gray-800/50">
          
          {/* Top Bar with History Toggle */}
          <div className="flex justify-between items-center mb-4 px-2">
            <h1 className="text-white font-medium tracking-wide text-sm opacity-50">SmartCalc Pro</h1>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-full transition-all ${showHistory ? 'bg-calc-accent text-white' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
              title="History"
            >
              <History size={18} />
            </button>
          </div>

          <Display expression={expression} result={result} />

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {CALCULATOR_BUTTONS.map((btn) => (
              <Button 
                key={btn.value} 
                button={btn} 
                onClick={handleButtonClick} 
              />
            ))}
          </div>

        </div>

        {/* History Drawer (Absolute positioning to overlay or slide out) */}
        {showHistory && (
          <div className="absolute top-20 left-6 right-6 bottom-6 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl p-4 overflow-y-auto z-10 animate-in slide-in-from-bottom-4 duration-200">
             <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
               <span className="text-white font-medium">History</span>
               <button onClick={() => setHistory([])} className="text-xs text-red-400 hover:text-red-300">Clear All</button>
             </div>
             {history.length === 0 ? (
               <div className="text-center text-gray-500 mt-10">No history yet</div>
             ) : (
               <div className="space-y-3">
                 {history.map((item) => (
                   <div 
                    key={item.id} 
                    className="flex flex-col items-end p-2 hover:bg-white/5 rounded-lg cursor-pointer active:scale-95 transition-transform"
                    onClick={() => {
                      setExpression(item.expression); // Load expression back
                      setResult('');
                      setShowHistory(false);
                    }}
                   >
                     <span className="text-gray-400 text-sm">{item.expression}</span>
                     <span className="text-white text-xl font-medium">= {item.result}</span>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

      </div>

      <AiModal 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
        onSolve={handleAiSolve}
      />
      
    </div>
  );
};

export default App;
