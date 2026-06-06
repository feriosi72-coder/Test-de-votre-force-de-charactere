import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import type { Answer, LikertValue } from '../types';

interface QuestionnaireProps {
  onComplete: (answers: Answer[]) => void;
  onReset: () => void;
}

const LIKERT_OPTIONS: { value: LikertValue; label: string; shortLabel: string }[] = [
  { value: 1, label: 'Pas du tout d\'accord', shortLabel: 'Pas du tout' },
  { value: 2, label: 'Plutôt pas d\'accord', shortLabel: 'Plutôt non' },
  { value: 3, label: 'Neutre', shortLabel: 'Neutre' },
  { value: 4, label: 'Plutôt d\'accord', shortLabel: 'Plutôt oui' },
  { value: 5, label: 'Tout à fait d\'accord', shortLabel: 'Tout à fait' },
];

type Direction = 'forward' | 'backward' | null;

export default function Questionnaire({ onComplete, onReset }: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('forcevie_current_index');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [answers, setAnswers] = useState<Map<number, LikertValue>>(() => {
    const saved = localStorage.getItem('forcevie_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return new Map(parsed);
      } catch (e) {
        return new Map();
      }
    }
    return new Map();
  });

  const [direction, setDirection] = useState<Direction>(null);
  const [animKey, setAnimKey] = useState(0);

  // Persist state
  useEffect(() => {
    localStorage.setItem('forcevie_current_index', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('forcevie_answers', JSON.stringify(Array.from(answers.entries())));
  }, [answers]);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer = answers.get(currentQuestion.id);
  const progress = Math.round(((Object.keys(Object.fromEntries(answers)).length) / total) * 100);

  const navigate = useCallback((dir: Direction) => {
    setDirection(dir);
    setAnimKey(k => k + 1);
    if (dir === 'forward' && currentIndex < total - 1) {
      setCurrentIndex(i => i + 1);
    } else if (dir === 'backward' && currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex, total]);

  const selectAnswer = (value: LikertValue) => {
    setAnswers(prev => new Map(prev).set(currentQuestion.id, value));
  };

  const handleNext = () => {
    if (currentIndex === total - 1) {
      // Collect all answers, default unanswered to 3
      const result: Answer[] = QUESTIONS.map(q => ({
        questionId: q.id,
        value: (answers.get(q.id) ?? 3) as LikertValue,
      }));
      onComplete(result);
    } else {
      navigate('forward');
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
      else if (e.key === 'ArrowLeft' && currentIndex > 0) navigate('backward');
      else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        selectAnswer(parseInt(e.key) as LikertValue);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, handleNext, navigate]);

  const isLastQuestion = currentIndex === total - 1;
  const animClass = direction === 'forward' ? 'animate-slide-in-right' : direction === 'backward' ? 'animate-slide-in-left' : 'animate-fade-in';

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Fixed Progress Bar */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-cream-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-navy-600 rounded-lg flex items-center justify-center">
                <Sparkles size={12} className="text-gold-200" />
              </div>
              <span className="text-xs font-semibold text-navy-500 uppercase tracking-widest">ForceVie</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={onReset}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors"
                title="Tout recommencer et effacer la mémoire"
              >
                <RotateCcw size={12} />
                Réinitialiser
              </button>
              <span className="text-xs font-medium text-navy-400">
                <span className="text-navy-700 font-semibold">{currentIndex + 1}</span>
                <span className="text-navy-300"> / {total}</span>
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sage-500 to-navy-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(((currentIndex + 1) / total) * 100, 2)}%` }}
            />
          </div>
          <div className="mt-1 text-right">
            <span className="text-xs text-navy-400">{progress}% complété</span>
          </div>
        </div>
      </header>

      {/* Question Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div
            key={animKey}
            className={`${animClass} bg-white rounded-3xl border border-cream-200 shadow-sm p-8 md:p-12`}
          >
            {/* Question number */}
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-6">
              Affirmation {currentIndex + 1}
            </p>

            {/* Question text */}
            <h2 className="font-display text-2xl md:text-3xl text-navy-700 leading-snug mb-12 text-balance">
              "{currentQuestion.text}"
            </h2>

            {/* Likert Scale */}
            <div className="space-y-3">
              {LIKERT_OPTIONS.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => selectAnswer(option.value)}
                    className={`
                      w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left
                      transition-all duration-200 ease-out active:scale-[0.98] group
                      ${isSelected
                        ? 'border-navy-600 bg-navy-600 shadow-md'
                        : 'border-cream-200 bg-white hover:border-navy-300 hover:bg-cream-50'
                      }
                    `}
                  >
                    {/* Radio indicator */}
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200
                      ${isSelected
                        ? 'border-white bg-white'
                        : 'border-navy-300 group-hover:border-navy-400'
                      }
                    `}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-navy-600" />
                      )}
                    </div>

                    {/* Value badge */}
                    <span className={`
                      flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center
                      transition-all duration-200
                      ${isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-cream-100 text-navy-400'
                      }
                    `}>
                      {option.value}
                    </span>

                    {/* Label */}
                    <span className={`
                      font-medium text-sm md:text-base transition-colors duration-200
                      ${isSelected ? 'text-white' : 'text-navy-600'}
                    `}>
                      <span className="hidden md:inline">{option.label}</span>
                      <span className="md:hidden">{option.shortLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hint */}
            <p className="mt-5 text-center text-xs text-navy-300">
              Utilisez les touches <kbd className="bg-cream-100 border border-cream-200 px-1.5 py-0.5 rounded text-navy-400 font-mono">1–5</kbd> ou cliquez pour répondre
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <button
              onClick={() => navigate('backward')}
              disabled={currentIndex === 0}
              className="btn-ghost flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Précédent
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(total, 9) }).map((_, i) => {
                const questionIndex = Math.floor((i / 8) * (total - 1));
                const qId = QUESTIONS[questionIndex].id;
                const answered = answers.has(qId);
                return (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      answered ? 'bg-sage-400' : 'bg-cream-200'
                    } ${questionIndex === currentIndex ? 'w-6' : 'w-1.5'}`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-2xl transition-all duration-200 active:scale-95
                ${isLastQuestion
                  ? 'bg-sage-500 text-white hover:bg-sage-600 shadow-md'
                  : 'btn-primary'
                }
              `}
            >
              {isLastQuestion ? 'Voir mes forces' : 'Suivant'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
