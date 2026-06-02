import { useState } from 'react';
import { Sparkles, Trophy, Zap, RotateCcw, ChevronDown, ChevronUp, Star, Briefcase, Heart } from 'lucide-react';
import type { StrengthScore, UserProfile } from '../types';
import { STRENGTHS } from '../data/strengths';

interface ResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

const VIRTUE_COLORS: Record<string, string> = {
  'Sagesse': '#2E5266',
  'Courage': '#B8914A',
  'Humanité': '#6B8F71',
  'Justice': '#2E5266',
  'Tempérance': '#557359',
  'Transcendance': '#C9A96E',
};

const VIRTUE_LIGHT_COLORS: Record<string, string> = {
  'Sagesse': '#E8EDF0',
  'Courage': '#F5E9D0',
  'Humanité': '#EEF3EF',
  'Justice': '#E8EDF0',
  'Tempérance': '#EEF3EF',
  'Transcendance': '#F5E9D0',
};

function SignatureCard({ score, rank }: { score: StrengthScore; rank: number }) {
  const bgColor = score.strength.lightColor;
  const accentColor = score.strength.color;

  return (
    <div
      className="relative rounded-3xl p-8 border-2 overflow-hidden animate-slide-up"
      style={{ backgroundColor: bgColor, borderColor: accentColor + '30' }}
    >
      {/* Rank badge */}
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-md"
        style={{ backgroundColor: accentColor }}
      >
        #{rank}
      </div>

      {/* Virtue label */}
      <div
        className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
        style={{ backgroundColor: accentColor + '20', color: accentColor }}
      >
        {score.strength.virtue}
      </div>

      {/* Icon + Name */}
      <div className="mb-3">
        <span className="text-4xl mb-2 block">{score.strength.icon}</span>
        <h3 className="font-display text-2xl font-semibold text-navy-700">
          {score.strength.name}
        </h3>
        <p className="text-sm font-medium mt-1" style={{ color: accentColor }}>
          {score.strength.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="text-navy-500 text-sm leading-relaxed mt-4">
        {score.strength.description}
      </p>

      {/* Score bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-navy-400 mb-1.5">
          <span>Score</span>
          <span className="font-semibold text-navy-600">{Math.round(score.percentile)}%</span>
        </div>
        <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${score.percentile}%`, backgroundColor: accentColor }}
          />
        </div>
      </div>
    </div>
  );
}

function ActionPlan({ topScore }: { topScore: StrengthScore }) {
  const [activeTab, setActiveTab] = useState<'work' | 'life'>('work');

  return (
    <div className="bg-navy-600 rounded-3xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
          <Zap size={20} className="text-gold-300" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Plan d'action — {topScore.strength.name}</h3>
          <p className="text-navy-200 text-xs">Activez votre force n°1 dès aujourd'hui</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('work')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            ${activeTab === 'work' ? 'bg-white text-navy-700 shadow-sm' : 'text-navy-200 hover:text-white'}`}
        >
          <Briefcase size={14} />
          Au travail
        </button>
        <button
          onClick={() => setActiveTab('life')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            ${activeTab === 'life' ? 'bg-white text-navy-700 shadow-sm' : 'text-navy-200 hover:text-white'}`}
        >
          <Heart size={14} />
          Dans ma vie
        </button>
      </div>

      {/* Action content */}
      <div className="bg-white/10 rounded-2xl p-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gold-400/30 rounded-xl flex items-center justify-center mt-0.5">
            <Star size={16} className="text-gold-300" />
          </div>
          <p className="text-sm text-white leading-relaxed">
            {activeTab === 'work'
              ? topScore.strength.actionWork
              : topScore.strength.actionLife
            }
          </p>
        </div>
      </div>
    </div>
  );
}

function FullProfile({ scores }: { scores: StrengthScore[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleScores = expanded ? scores : scores.slice(3);

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8">
      <h3 className="font-semibold text-navy-700 text-xl mb-2">Votre profil complet</h3>
      <p className="text-navy-400 text-sm mb-8">24 forces classées par intensité</p>

      <div className="space-y-4">
        {visibleScores.map((score, index) => {
          const rank = scores.indexOf(score) + 1;
          const virtueColor = VIRTUE_COLORS[score.strength.virtue] ?? '#2E5266';
          const virtueLight = VIRTUE_LIGHT_COLORS[score.strength.virtue] ?? '#E8EDF0';

          return (
            <div key={score.strength.id} className="flex items-center gap-4 group" style={{ animationDelay: `${index * 30}ms` }}>
              {/* Rank */}
              <span className="w-7 text-right text-xs font-semibold text-navy-300 flex-shrink-0">
                {rank}
              </span>

              {/* Icon */}
              <span className="text-lg flex-shrink-0 w-7 text-center">{score.strength.icon}</span>

              {/* Name + virtue */}
              <div className="flex-shrink-0 w-32 md:w-40">
                <p className="text-sm font-medium text-navy-700 truncate">{score.strength.name}</p>
                <p className="text-xs text-navy-400 truncate">{score.strength.virtue}</p>
              </div>

              {/* Progress bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-cream-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${score.percentile}%`,
                      backgroundColor: virtueColor,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-navy-500 w-10 text-right flex-shrink-0">
                  {Math.round(score.percentile)}%
                </span>
              </div>

              {/* Virtue badge (desktop) */}
              <div
                className="hidden md:block flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: virtueLight, color: virtueColor }}
              >
                {score.strength.virtue}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand button for non-top 3 */}
      {!expanded && scores.length > 3 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-navy-700 font-medium py-3 border border-dashed border-cream-200 rounded-2xl hover:border-navy-300 hover:bg-cream-50 transition-all duration-200"
        >
          <ChevronDown size={16} />
          Voir les {scores.length - 3} autres forces
        </button>
      )}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-navy-700 font-medium py-3 border border-dashed border-cream-200 rounded-2xl hover:border-navy-300 hover:bg-cream-50 transition-all duration-200"
        >
          <ChevronUp size={16} />
          Réduire
        </button>
      )}
    </div>
  );
}

export default function Results({ profile, onRestart }: ResultsProps) {
  const topThree = profile.scores.slice(0, 3);
  const topScore = profile.scores[0];

  const virtueGroups = STRENGTHS.reduce<Record<string, number>>((acc, s) => {
    const score = profile.scores.find(sc => sc.strength.id === s.id);
    acc[s.virtue] = (acc[s.virtue] ?? 0) + (score?.percentile ?? 0);
    return acc;
  }, {});

  const dominantVirtue = Object.entries(virtueGroups).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';

  return (
    <div className="min-h-screen bg-cream-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy-600 rounded-xl flex items-center justify-center">
              <Sparkles size={13} className="text-gold-200" />
            </div>
            <span className="font-display font-semibold text-navy-700">ForceVie</span>
          </div>
          <button
            onClick={onRestart}
            className="btn-ghost text-sm flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-12">
        {/* Welcome banner */}
        <div className="text-center animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-3">
            Votre profil de forces
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-navy-700 mb-4 text-balance">
            Bonjour, {profile.firstName} !
          </h1>
          <p className="text-navy-400 text-lg max-w-xl mx-auto leading-relaxed">
            Votre vertu dominante est la{' '}
            <strong className="text-navy-600">{dominantVirtue}</strong>.
            Voici ce que votre profil révèle sur vous.
          </p>
        </div>

        {/* Top 3 Signature Strengths */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-gold-200 rounded-2xl flex items-center justify-center">
              <Trophy size={18} className="text-gold-500" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-700 text-xl">Vos 3 Forces Signatures</h2>
              <p className="text-navy-400 text-sm">Les piliers de votre caractère unique</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {topThree.map((score, i) => (
              <SignatureCard key={score.strength.id} score={score} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Action Plan */}
        <ActionPlan topScore={topScore} />

        {/* Full Profile */}
        <FullProfile scores={profile.scores} />

        {/* Virtue breakdown */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8">
          <h3 className="font-semibold text-navy-700 text-xl mb-2">Vos 6 vertus fondamentales</h3>
          <p className="text-navy-400 text-sm mb-8">Score moyen par domaine de valeurs</p>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(virtueGroups)
              .map(([virtue, total]) => ({ virtue, avg: total / STRENGTHS.filter(s => s.virtue === virtue).length }))
              .sort((a, b) => b.avg - a.avg)
              .map(({ virtue, avg }) => {
                const color = VIRTUE_COLORS[virtue] ?? '#2E5266';
                const light = VIRTUE_LIGHT_COLORS[virtue] ?? '#E8EDF0';
                return (
                  <div key={virtue} className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: light }}>
                    <div className="flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {Math.round(avg)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-700">{virtue}</p>
                      <div className="mt-1.5 h-1.5 bg-white/70 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${avg}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* CTA restart */}
        <div className="text-center pb-8">
          <p className="text-navy-400 text-sm mb-4">Envie de faire passer ce test à vos proches ?</p>
          <button
            onClick={onRestart}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={16} />
            Recommencer le test
          </button>
        </div>
      </div>
    </div>
  );
}
