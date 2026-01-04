import React, { useState } from 'react';
import { Instagram, Facebook, Mail, ArrowRight, Youtube, Linkedin } from 'lucide-react';
import Button from './ui/Button';

// Custom Tiktok Icon to match Lucide style
const TiktokIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY
        },
        body: JSON.stringify({
          email: email,
          listIds: [3], // Defaulting to 2, user can adjust if needed
          updateEnabled: true
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Error al suscribirse');
      }
    } catch (error: any) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'No hemos podido procesar tu suscripción.');
    }
  };

  return (
    <footer id="footer" className="bg-transparent pb-8 px-4 md:px-6 relative z-10">
      {/* Floating Container */}
      <div className="container mx-auto max-w-7xl bg-[#1c2938] rounded-[2.5rem] px-8 py-12 md:px-12 md:py-16 border border-white/5 relative overflow-hidden">

        {/* Top Grid: Newsletter, Links, Social */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Newsletter Section (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="newsletter-form">
              <h3 className="text-white font-medium mb-2">Descubre los secretos de como lanzar, crecer y optimizar un negocio</h3>

              {/* Success Message */}
              {status === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl p-4 text-sm mb-4">
                  Estas un paso más cerca de validar tu idea - Suscrito a Kônsul Newsletter
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="relative max-w-sm">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center bg-[#16202c] border border-white/10 rounded-full p-1 pl-4 focus-within:border-[#27bea5] transition-colors">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introduce tu email"
                      required
                      className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500 py-2"
                      disabled={status === 'loading'}
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-[#27bea5] hover:bg-[#1fa992] disabled:opacity-50 text-white rounded-full p-2 transition-colors inline-flex items-center justify-center min-w-[32px] min-h-[32px]"
                    >
                      {status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Links Columns (Middle) */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">General</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="https://konsul.digital/conoce-quienes-somos/" className="text-white hover:text-[#27bea5] transition-colors">Conócenos</a></li>
                <li><a href="https://konsul.digital/conoce-ecosistema-konsul-ia/" className="text-white hover:text-[#27bea5] transition-colors">Ecosistema</a></li>
                <li><a href="https://konsul.digital/blog-recursos-y-guias/" className="text-white hover:text-[#27bea5] transition-colors">Recursos y guías</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Producto</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#chatbot" className="text-white hover:text-[#27bea5] transition-colors">Chatbot IA</a></li>
                <li><a href="https://konsul.digital/soluciones-empresariales/" className="text-white hover:text-[#27bea5] transition-colors">Soluciones empresariales</a></li>
                <li><a href="https://konsul.digital/herramientas-autonomas/" className="text-white hover:text-[#27bea5] transition-colors">Herramientas autónomas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="https://konsul.digital/terminos-y-condiciones/" className="text-white hover:text-[#27bea5] transition-colors">Términos</a></li>
                <li><a href="https://konsul.digital/politica-de-privacidad-konsul/" className="text-white hover:text-[#27bea5] transition-colors">Privacidad</a></li>
                <li><a href="https://konsul.digital/politica-de-cookies/" className="text-white hover:text-[#27bea5] transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Ayuda</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="mailto:somos@konsul.digital" className="text-white hover:text-[#27bea5] transition-colors">somos@konsul.digital</a></li>
                <li><a href="https://konsul.digital/" className="text-white hover:text-[#27bea5] transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Brand & Social (Right) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <img
              src="https://konsul.digital/wp-content/uploads/2025/07/Logo-en-BW-e1751712792454.png"
              alt="Konsul Logo"
              className="h-8 mb-6"
            />
            <span className="text-sm text-gray-400 mb-4 block">Únete a nuestra comunidad</span>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, url: "https://www.instagram.com/konsul.ia/" },
                { Icon: Facebook, url: "https://www.facebook.com/profile.php?id=61579930954017" },
                { Icon: Youtube, url: "https://www.youtube.com/@KonsulDigital" },
                { Icon: TiktokIcon, url: "https://www.tiktok.com/@konsul.digital" },
                { Icon: Linkedin, url: "https://www.linkedin.com/company/konsul-ia" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#27bea5] transition-colors"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal Text */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-5xl">
            © 2025 Kônsul — Ecosistema de automatización y productividad. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
