import React from 'react';
import Button from './ui/Button';
import { ArrowRight } from 'lucide-react';

interface Integration {
  name: string;
  color: string;
  icon: string;
}

const LogoCard: React.FC<{ item: Integration }> = ({ item }) => (
  <div className="flex items-center gap-3 px-6 py-4 bg-[#1c2938] border border-white/5 rounded-2xl mx-3 min-w-[200px] hover:bg-white/5 transition-colors group cursor-default shadow-lg">
    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-xl shadow-lg text-black/80`}>
      {item.icon}
    </div>
    <span className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors">
      {item.name}
    </span>
  </div>
);

const Integrations: React.FC = () => {
  const row1: Integration[] = [
    { name: 'Shopify', color: 'bg-green-500', icon: '🛍️' },
    { name: 'WhatsApp', color: 'bg-emerald-500', icon: '💬' },
    { name: 'VTEX', color: 'bg-pink-500', icon: '🚀' },
    { name: 'HubSpot', color: 'bg-orange-500', icon: '🎯' },
    { name: 'Tiendanube', color: 'bg-blue-400', icon: '☁️' },
    { name: 'Instagram', color: 'bg-purple-500', icon: '📸' },
    { name: 'Zoho', color: 'bg-yellow-500', icon: '📊' },
    { name: 'WooCommerce', color: 'bg-violet-500', icon: '🛒' },
  ];

  const row2: Integration[] = [
    { name: 'Salesforce', color: 'bg-blue-600', icon: '☁️' },
    { name: 'Zendesk', color: 'bg-green-600', icon: '🎧' },
    { name: 'Stripe', color: 'bg-indigo-500', icon: '💳' },
    { name: 'Facebook', color: 'bg-blue-500', icon: '👤' },
    { name: 'Zapier', color: 'bg-orange-600', icon: '⚡' },
    { name: 'MercadoLibre', color: 'bg-yellow-400', icon: '🤝' },
    { name: 'Google Sheets', color: 'bg-green-400', icon: '📊' },
    { name: 'Mailchimp', color: 'bg-yellow-400', icon: '🐵' },
  ];

  return (
    <section className="py-16 md:py-32 bg-[#1c2938] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-konsul-500/5 rounded-full blur-[80px] md:blur-[100px] -z-10" />

      <div className="container mx-auto px-6 text-center mb-12 md:mb-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter">
          Conecta Konsul con <br className="hidden md:block" />
          <span className="text-gray-500">tu ecosistema digital.</span>
        </h2>
        <p className="text-base sm:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto font-normal">
          Sincroniza tus catálogos, pedidos y CRM en tiempo real. Integraciones nativas con las plataformas líderes de E-commerce y CRM.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Updated button colors */}
          <Button variant="primary" className="text-white bg-[#27bea5] hover:bg-[#1fa992]">
            Ver todas las integraciones
          </Button>
          <Button variant="outline" icon={<ArrowRight size={16} />}>
            Documentación API
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden space-y-6 md:space-y-8">
        {/* Left Gradient Fade - Updated color */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#1c2938] to-transparent z-20 pointer-events-none" />
        {/* Right Gradient Fade - Updated color */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#1c2938] to-transparent z-20 pointer-events-none" />

        {/* First Row - Scrolls Left */}
        <div className="flex animate-scroll-left hover:[animation-play-state:paused] w-max">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <LogoCard key={`${item.name}-${idx}`} item={item} />
          ))}
        </div>

        {/* Second Row - Scrolls Right */}
        <div className="flex animate-scroll-right hover:[animation-play-state:paused] w-max">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <LogoCard key={`${item.name}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;