import React from 'react';
import Button from './ui/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Backgrounds removed here as they are now handled in App.tsx wrapper */}
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter">
          ¿Listo para escalar tus <br /> ventas por WhatsApp?
        </h2>
        <p className="text-base sm:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto font-normal">
          Únete a las empresas líderes que ya están usando Konsul para automatizar su comercio conversacional.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="px-12 bg-[#27bea5] text-white hover:bg-[#1fa992]">
            Prueba Gratis 14 Días
          </Button>
          <Button size="lg" variant="outline" className="px-12">
            Agendar Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;