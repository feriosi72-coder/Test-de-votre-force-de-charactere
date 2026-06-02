import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import SaveForm from './components/SaveForm';
import Results from './components/Results';
import { computeScores } from './utils/scoring';
import { supabase } from './lib/supabase';
import type { AppStep, Answer, UserProfile } from './types';

export default function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleQuestionnaireComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    setStep('save');
  };

  const handleSaveSubmit = async (firstName: string, email: string) => {
    const scores = computeScores(answers);
    const topStrengthId = scores[0]?.strength.id ?? '';

    const newProfile: UserProfile = {
      firstName,
      email,
      answers,
      scores,
      createdAt: new Date().toISOString(),
    };

    // Persist to Supabase (non-blocking: don't fail the UX if it errors)
    try {
      await supabase.from('test_results').insert({
        first_name: firstName,
        email,
        answers: answers.map(a => ({ questionId: a.questionId, value: a.value })),
        scores: scores.map(s => ({ strengthId: s.strength.id, score: s.score, percentile: s.percentile })),
        top_strength_id: topStrengthId,
      });
    } catch {
      // Silently continue — results are computed client-side
    }

    setProfile(newProfile);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('landing');
    setAnswers([]);
    setProfile(null);
  };

  return (
    <>
      {step === 'landing' && (
        <LandingPage onStart={() => setStep('questionnaire')} />
      )}
      {step === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      )}
      {step === 'save' && (
        <SaveForm onSubmit={handleSaveSubmit} />
      )}
      {step === 'results' && profile && (
        <Results profile={profile} onRestart={handleRestart} />
      )}
    </>
  );
}
