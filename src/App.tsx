import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import SaveForm from './components/SaveForm';
import Results from './components/Results';
import { computeScores } from './utils/scoring';
import { supabase } from './lib/supabase';
import type { AppStep, Answer, UserProfile } from './types';

export default function App() {
  const [step, setStep] = useState<AppStep>(() => {
    const saved = localStorage.getItem('forcevie_step');
    return (saved as AppStep) || 'landing';
  });
  const [answers, setAnswers] = useState<Answer[]>(() => {
    try {
      const saved = localStorage.getItem('forcevie_app_answers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('forcevie_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('forcevie_step', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('forcevie_app_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('forcevie_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('forcevie_profile');
    }
  }, [profile]);

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
    localStorage.removeItem('forcevie_step');
    localStorage.removeItem('forcevie_answers');
    localStorage.removeItem('forcevie_current_index');
    localStorage.removeItem('forcevie_app_answers');
    setStep('results');
  };

  const handleRestart = () => {
    localStorage.removeItem('forcevie_step');
    localStorage.removeItem('forcevie_answers');
    localStorage.removeItem('forcevie_current_index');
    localStorage.removeItem('forcevie_app_answers');
    localStorage.removeItem('forcevie_profile');
    setStep('landing');
    setAnswers([]);
    setProfile(null);
  };

  return (
    <>
      {step === 'landing' && (
        <LandingPage onStart={() => setStep('questionnaire')} onReset={handleRestart} />
      )}
      {step === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} onReset={handleRestart} />
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
