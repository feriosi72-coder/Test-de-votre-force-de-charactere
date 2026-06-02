import { useState, type FormEvent } from 'react';
import { ArrowRight, Sparkles, Lock, User, Mail, Loader2 } from 'lucide-react';

interface SaveFormProps {
  onSubmit: (firstName: string, email: string) => Promise<void>;
}

export default function SaveForm({ onSubmit }: SaveFormProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('Votre prénom est requis.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(firstName.trim(), email.trim().toLowerCase());
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md animate-slide-up">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-navy-600 flex items-center justify-center shadow-xl">
              <Sparkles size={32} className="text-gold-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-navy-700 mb-3">
            Votre profil est prêt !
          </h1>
          <p className="text-navy-400 leading-relaxed text-sm">
            Entrez votre prénom et votre e-mail pour calculer votre profil de forces
            personnalisé et recevoir votre analyse complète.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-2">
                Prénom
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  autoComplete="given-name"
                  autoFocus
                  className="w-full pl-11 pr-4 py-3.5 bg-cream-50 border border-cream-200 rounded-xl text-navy-700 placeholder-navy-300 text-sm
                    focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-cream-50 border border-cream-200 rounded-xl text-navy-700 placeholder-navy-300 text-sm
                    focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Calcul en cours...
                </>
              ) : (
                <>
                  Révéler mon profil de forces
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Privacy note */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-navy-300">
            <Lock size={11} />
            <span>Vos données restent confidentielles et ne sont jamais partagées.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
