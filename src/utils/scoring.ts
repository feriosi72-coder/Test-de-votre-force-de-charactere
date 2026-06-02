import type { Answer, StrengthScore } from '../types';
import { QUESTIONS } from '../data/questions';
import { STRENGTHS } from '../data/strengths';

export function computeScores(answers: Answer[]): StrengthScore[] {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  const rawScores = STRENGTHS.map(strength => {
    const relatedQuestions = QUESTIONS.filter(q => q.strengthId === strength.id);
    let total = 0;

    relatedQuestions.forEach(q => {
      const value = answerMap.get(q.id) ?? 3;
      total += q.reversed ? (6 - value) : value;
    });

    const maxPossible = relatedQuestions.length * 5;
    const rawScore = maxPossible > 0 ? total / maxPossible : 0;

    return { strength, rawScore };
  });

  // Sort by score descending
  rawScores.sort((a, b) => b.rawScore - a.rawScore);

  // Assign percentiles: highest raw score = ~98%, spread linearly
  const n = rawScores.length;

  return rawScores.map((item, index) => {
    // Percentile: top gets 98, bottom gets 35, spread linearly
    const percentile = 98 - ((index / (n - 1)) * 63);

    return {
      strength: item.strength,
      score: item.rawScore,
      percentile: Math.round(percentile * 10) / 10,
    };
  });
}
