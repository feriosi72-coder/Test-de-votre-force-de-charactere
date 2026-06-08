import { Sparkles, BookOpen, ArrowRight, CheckCircle2, Brain, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy-600 rounded-xl flex items-center justify-center">
            <Sparkles size={16} className="text-gold-200" />
          </div>
          <span className="font-display font-semibold text-navy-700 text-lg tracking-tight">ForceVie</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#science" className="text-navy-500 text-sm font-medium hover:text-navy-700 transition-colors duration-200 flex items-center gap-1.5">
            <BookOpen size={14} />
            La science des forces
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sage-50 border border-sage-200 text-sage-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Star size={12} fill="currentColor" />
            Basé sur la psychologie positive VIA
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy-700 leading-[1.1] mb-6 text-balance">
            Découvrez le{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-sage-600">meilleur</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-gold-200 -z-0 rounded" />
            </span>
            {' '}de vous-même
          </h1>

          {/* Subtitle */}
          <p className="text-navy-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-4">
            Identifiez vos 24 forces de caractère avec un test scientifique de 72 questions.
            Recevez un profil personnalisé et des pistes d'action concrètes.
          </p>

          {/* Reassurance pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {['Gratuit', '~15 minutes', 'Résultats immédiats', 'Aucune inscription requise'].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-sm text-navy-500 bg-white border border-cream-200 px-3 py-1.5 rounded-full shadow-sm">
                <CheckCircle2 size={13} className="text-sage-500" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="group btn-primary text-lg flex items-center gap-3 mx-auto"
          >
            Commencer le test gratuitement
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Process Steps */}
        <section id="science" className="mt-28 max-w-4xl mx-auto w-full">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy-400 mb-10">
            Comment ça fonctionne
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Brain size={22} className="text-navy-600" />,
                title: 'Répondre',
                description: 'Évaluez 72 affirmations courtes sur une échelle de 1 à 5. Un format intuitif, une question à la fois.',
              },
              {
                step: '02',
                icon: <Sparkles size={22} className="text-sage-600" />,
                title: 'Découvrir',
                description: 'Recevez votre profil de forces unique : vos 3 forces signatures et votre classement complet.',
              },
              {
                step: '03',
                icon: <Star size={22} className="text-gold-400" />,
                title: 'Activer',
                description: 'Accédez à des plans d\'action concrets pour mobiliser vos forces dès aujourd\'hui.',
              },
            ].map(({ step, icon, title, description }) => (
              <div
                key={step}
                className="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
              >
                <span className="absolute top-6 right-6 text-5xl font-display font-bold text-cream-200 select-none group-hover:text-cream-200 transition-colors">
                  {step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mb-5">
                  {icon}
                </div>
                <h3 className="font-semibold text-navy-700 text-xl mb-3">{title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science Section */}
        <section className="mt-20 max-w-2xl mx-auto w-full bg-navy-600 rounded-3xl p-10 text-center text-white">
          <Sparkles size={28} className="text-gold-300 mx-auto mb-5" />
          <h2 className="font-display text-2xl md:text-3xl mb-4 text-balance">
            Une approche fondée sur la science
          </h2>
          <p className="text-navy-200 leading-relaxed text-sm md:text-base">
            Le modèle VIA (Values in Action) a été développé par les psychologues{' '}
            <strong className="text-white">Martin Seligman</strong> et{' '}
            <strong className="text-white">Christopher Peterson</strong> après l'analyse de{' '}
            plus de 3 millions de personnes dans 190 pays. Il identifie 24 forces universelles
            réparties en 6 vertus fondamentales.
          </p>
          <button
            onClick={onStart}
            className="mt-8 bg-white text-navy-700 font-semibold px-8 py-4 rounded-2xl hover:bg-cream-100 active:scale-95 transition-all duration-200 shadow-md flex items-center gap-2 mx-auto"
          >
            Démarrer maintenant
            <ArrowRight size={18} />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-navy-400 text-xs border-t border-cream-200">
        <p>ForceVie — Inspiré de la méthodologie VIA Institute on Character</p>
      </footer>
    </div>
  );
}
