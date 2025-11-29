import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, ArrowLeft } from 'lucide-react';
import { solveMathProblem } from '../services/geminiService';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolve: (result: string) => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose, onSolve }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await solveMathProblem(prompt);
      onSolve(response.answer); // Update calculator display
      onClose(); // Close modal
      setPrompt(''); // Clear input
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-calc-bg w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-2 text-calc-accent">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI Math Solver</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-400 text-sm mb-4">
            Type a math problem, equation, or question (e.g., "What is the square root of 144 plus 50?"). 
            The AI will compute it and set the result on the calculator.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-calc-display text-white rounded-xl p-4 min-h-[100px] resize-none focus:ring-2 focus:ring-calc-accent outline-none placeholder-gray-600 font-medium"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 bg-calc-accent hover:bg-calc-accentHover disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Solving...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Solve
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiModal;
