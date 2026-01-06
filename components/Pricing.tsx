import React from 'react';
import Button from './ui/Button';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$135",
      desc: "Ideal para PYMES que inician a automatizar.",
      features: ["Hasta 2,500 conversaciones al mes", "2 Agente IA", "Integración con Web, WhatsApp, Instagram y Facebook", "Soporte por Email y Chat", "Panel de Analítica"],
      highlight: false,
      url: "https://wa.link/5mn0sl"
    },
    {
      name: "Business",
      price: "$245",
      desc: "El favorito de empresas listas para escalar.",
      features: ["Hasta 7,500 conversaciones al mes", "4 Agente IA", "Integración con Web, WhatsApp, Instagram y Facebook", "Soporte prioritario por Email y Chat", "Panel de Analítica"],
      highlight: true,
      url: "https://wa.link/s8lvd4"
    },
    {
      name: "Enterprise",
      price: "$475",
      desc: "Potencia total para tu negocio.",
      features: ["Hasta 20,000 conversaciones al mes", "6 Agente IA", "Integración con Web, WhatsApp, Instagram y Facebook", "Soporte prioritario por Email, Chat y videollamada", "Panel de Analítica"],
      highlight: false,
      url: "https://wa.link/9awpeg"
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-konsul-950 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">Planes Simples</h2>
          <p className="text-gray-400 font-normal">Sin costos ocultos. Cancela cuando quieras.</p>
          <p className="text-gray-400 font-normal">Costo de Implementación $1,500.00</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-5 md:p-8 border flex flex-col ${plan.highlight
                ? 'bg-white/5 border-konsul-500/50 shadow-2xl shadow-konsul-500/10 md:scale-105 z-10'
                : 'bg-[#1c2938] border-white/10 hover:border-white/20'
                } transition-all duration-300`}
            >
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500">/mes</span>}
                </div>
                <p className="text-sm text-gray-400 mt-4 font-normal">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="mt-1 p-0.5 rounded-full bg-konsul-500/20 text-konsul-400">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-300 font-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.highlight ? 'secondary' : 'outline'}
                className="w-full"
                href={plan.url}
                analyticsEvent={{
                  name: 'pricing_plan_click',
                  params: {
                    plan_name: plan.name,
                    plan_price: plan.price
                  }
                }}
              >
                {plan.price === 'Custom' ? 'Contactar Ventas' : 'Comenzar Ahora'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
