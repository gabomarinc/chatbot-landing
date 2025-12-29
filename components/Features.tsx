import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Share2, BarChart3, Users, ArrowRight, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import Button from './ui/Button';

// Reusing the exact card dimensions and style logic from EmotionalValue
// Card Size: w-[320px] h-[450px]
// Border Radius: rounded-[2.5rem]

const featuresData = [
  {
    id: 0,
    title: "Bandeja Compartida",
    label: "Multi-Agente",
    description: "Centraliza WhatsApp, Instagram y Messenger. Asigna conversaciones a tu equipo automáticamente.",
    icon: <Users className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        {/* Inbox UI Mockup */}
        <div className="w-full bg-[#16202c] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
           <div className="h-8 bg-[#1c2938] border-b border-white/5 flex items-center px-3 gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
           </div>
           <div className="p-3 space-y-2">
              {[
                { name: 'Juan P.', msg: 'Quiero cotizar...', time: '2m', active: true },
                { name: 'Ana M.', msg: 'Gracias por la ayuda', time: '15m', active: false },
                { name: 'Carlos R.', msg: '¿Tienen stock?', time: '1h', active: false },
              ].map((chat, i) => (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${chat.active ? 'bg-konsul-500/10 border border-konsul-500/20' : 'bg-transparent'}`}>
                   <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                         <span className="text-[10px] font-bold text-white truncate">{chat.name}</span>
                         <span className="text-[9px] text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 truncate">{chat.msg}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: "Envíos Masivos",
    label: "WhatsApp Marketing",
    description: "Lanza campañas oficiales con tasas de apertura del 98%. Reactiva clientes y vende más.",
    icon: <Send className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center pb-10">
         <div className="relative z-10 w-48 bg-[#1c2938] rounded-2xl border border-white/10 p-4 shadow-2xl text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
               <Send size={20} className="text-white ml-1" />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">Black Friday</h4>
            <p className="text-gray-400 text-xs mb-4">Campaña enviada a 5,000 clientes</p>
            <div className="flex justify-between text-left text-xs">
               <div>
                  <span className="block text-gray-500">Enviados</span>
                  <span className="font-bold text-white">100%</span>
               </div>
               <div>
                  <span className="block text-gray-500">Leídos</span>
                  <span className="font-bold text-green-400">98%</span>
               </div>
            </div>
         </div>
         {/* Abstract waves */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[60px] -z-10" />
      </div>
    )
  },
  {
    id: 2,
    title: "Chatbots No-Code",
    label: "Automatización",
    description: "Crea flujos de venta y soporte arrastrando y soltando. Sin necesidad de programadores.",
    icon: <Bot className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
         <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative z-10">
             {/* Flow Nodes */}
             <div className="flex gap-4">
                <div className="bg-[#1c2938] border border-white/20 p-2 rounded-lg text-[10px] text-white font-medium w-24 text-center">Inicio</div>
             </div>
             <div className="h-4 w-px bg-white/20" />
             <div className="flex gap-4">
                <div className="bg-konsul-500 border border-konsul-400 p-2 rounded-lg text-[10px] text-white font-bold w-28 text-center shadow-lg">Menú Principal</div>
             </div>
             <div className="h-4 w-px bg-white/20" />
             <div className="flex gap-8">
                 <div className="flex flex-col items-center">
                     <div className="h-4 w-px bg-white/20 mb-2" />
                     <div className="bg-[#1c2938] border border-white/20 p-2 rounded-lg text-[10px] text-white w-20 text-center">Ventas</div>
                 </div>
                 <div className="flex flex-col items-center">
                     <div className="h-4 w-px bg-white/20 mb-2" />
                     <div className="bg-[#1c2938] border border-white/20 p-2 rounded-lg text-[10px] text-white w-20 text-center">Soporte</div>
                 </div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Métricas Reales",
    label: "Analytics",
    description: "Toma decisiones basadas en datos. Monitorea tiempos de respuesta y ventas por agente.",
    icon: <BarChart3 className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center px-6 pb-12">
         <div className="w-full h-40 bg-[#1c2938]/60 border border-white/10 rounded-xl p-4 relative overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col justify-end">
            <div className="absolute top-4 left-4">
               <span className="text-[10px] text-gray-400 uppercase font-bold">Ventas por Canal</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-24">
               {[40, 65, 45, 80, 55, 90].map((h, i) => (
                 <div key={i} className="w-full bg-konsul-500/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-konsul-500/60 to-transparent opacity-80" />
                 </div>
               ))}
            </div>
         </div>
      </div>
    )
  }
];

// EKG/Pulse Gradient Component
const EKGGradient = () => (
  <div className="absolute bottom-0 left-0 right-0 h-[50%] z-0 pointer-events-none overflow-hidden rounded-b-[2.5rem]">
    {/* CSS Styles for the Glow and Vertical Movement */}
    <style>{`
      @keyframes ekg-beat {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.2); }
      }
      .animate-ekg-beat {
        transform-origin: 50% 100%; /* Anchor to the baseline so peaks grow UP */
        animation: ekg-beat 4s ease-in-out infinite;
      }
    `}</style>

    {/* The Scrolling Wrapper */}
    <div className="relative w-[200%] h-full flex animate-scroll-left [animation-duration:8s]">
        
        {/* SVG 1 */}
        <svg className="w-1/2 h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
             <defs>
                 <linearGradient id="ekgFill" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#27bea5" stopOpacity="0" /> 
                    {/* Much lower opacity for a subtle gradient feel */}
                    <stop offset="100%" stopColor="#27bea5" stopOpacity="0.1" />
                 </linearGradient>
             </defs>
             
             {/* The Group that Beats Vertically */}
             <g className="animate-ekg-beat">
               {/* Filled Gradient Area (Subtle bottom anchor) */}
               <path fill="url(#ekgFill)" d="
                  M 0,200
                  L 0,160
                  C 20,160 30,160 40,160 
                  C 50,150 55,140 65,160
                  C 80,160 100,160 110,160
                  L 120,120 L 130,190 L 140,160
                  C 160,160 180,160 190,160
                  L 200,60 L 210,180 L 220,160
                  C 250,160 300,160 320,160
                  C 330,150 335,140 345,160
                  C 400,160 410,160 420,160
                  L 430,90 L 440,180 L 450,160
                  C 500,160 550,160 600,160
                  L 600,200
                  Z" 
               />

               {/* NEON LINE (Subtle, thin, translucent) */}
               <path 
                  fill="none" 
                  stroke="#27bea5" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="
                  M 0,160
                  C 20,160 30,160 40,160 
                  C 50,150 55,140 65,160
                  C 80,160 100,160 110,160
                  L 120,120 L 130,190 L 140,160
                  C 160,160 180,160 190,160
                  L 200,60 L 210,180 L 220,160
                  C 250,160 300,160 320,160
                  C 330,150 335,140 345,160
                  C 400,160 410,160 420,160
                  L 430,90 L 440,180 L 450,160
                  C 500,160 550,160 600,160" 
               />
             </g>
        </svg>

        {/* SVG 2 (Duplicate for seamless loop) */}
        <svg className="w-1/2 h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
             <g className="animate-ekg-beat">
               <path fill="url(#ekgFill)" d="
                  M 0,200
                  L 0,160
                  C 20,160 30,160 40,160 
                  C 50,150 55,140 65,160
                  C 80,160 100,160 110,160
                  L 120,120 L 130,190 L 140,160
                  C 160,160 180,160 190,160
                  L 200,60 L 210,180 L 220,160
                  C 250,160 300,160 320,160
                  C 330,150 335,140 345,160
                  C 400,160 410,160 420,160
                  L 430,90 L 440,180 L 450,160
                  C 500,160 550,160 600,160
                  L 600,200
                  Z" 
               />
               <path 
                  fill="none" 
                  stroke="#27bea5" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="
                  M 0,160
                  C 20,160 30,160 40,160 
                  C 50,150 55,140 65,160
                  C 80,160 100,160 110,160
                  L 120,120 L 130,190 L 140,160
                  C 160,160 180,160 190,160
                  L 200,60 L 210,180 L 220,160
                  C 250,160 300,160 320,160
                  C 330,150 335,140 345,160
                  C 400,160 410,160 420,160
                  L 430,90 L 440,180 L 450,160
                  C 500,160 550,160 600,160" 
               />
             </g>
        </svg>
    </div>
  </div>
);

const Features: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuresData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featuresData.length);
    setIsAutoPlaying(false);
  };

  return (
    // CHANGED: Reduced mobile top padding from pt-8 to pt-6 (approx -15-20%)
    // CHANGED: Reduced desktop vertical padding from md:py-24 to md:pt-20 md:pb-24 (-15% on top)
    <section id="features" className="pt-6 pb-16 md:pt-20 md:pb-24 bg-konsul-950 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* === LEFT COLUMN: Content & Navigation === */}
          <div className="lg:col-span-6 flex flex-col justify-center relative z-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tighter text-white leading-[1.1]">
              Una suite completa <br />
              <span className="text-gray-500">para ventas y soporte.</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-lg font-normal">
              Olvídate de usar múltiples herramientas. Konsul integra todo lo que necesitas para escalar tu atención al cliente y ventas por chat.
            </p>

            {/* Interactive Feature List */}
            <div className="space-y-4 mb-10 max-w-lg">
              {featuresData.map((feature, index) => (
                <div 
                  key={feature.id}
                  onClick={() => handleManualChange(index)}
                  className={`group cursor-pointer p-4 rounded-2xl transition-all duration-300 border ${
                    activeIndex === index 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 transition-colors duration-300 ${activeIndex === index ? 'text-[#27bea5]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                      {activeIndex === index ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border border-current" />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {feature.title}
                      </h3>
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-gray-500 text-sm mt-2 overflow-hidden font-normal"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button size="lg" icon={<ArrowRight size={18}/>}>
                Ver todas las funcionalidades
              </Button>
            </div>
          </div>


          {/* === RIGHT COLUMN: Carousel === */}
          {/* Centered to hold the single card stack */}
          {/* Adjusted height for mobile: h-[400px] vs h-[500px] on desktop */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-center overflow-hidden">
             
             {/* Carousel Window - Responsive max-width and height */}
             {/* Mobile: 280px x 380px, Desktop: 320px x 450px */}
             <div className="w-full max-w-[280px] md:max-w-[320px] h-[380px] md:h-[450px] relative perspective-[1000px]">
                {featuresData.map((feature, index) => {
                  
                  const isActive = index === activeIndex;
                  const diff = index - activeIndex;

                  // === ANIMATION LOGIC ===
                  let xVal = 0;
                  let scaleVal = 1;
                  let opacityVal = 1;
                  let zIndexVal = 10;
                  let rotateYVal = 0;

                  if (isActive) {
                      // CENTER: Visible, Front
                      xVal = 0;
                      scaleVal = 1;
                      opacityVal = 1;
                      zIndexVal = 20;
                      rotateYVal = 0;
                  } else if (diff < 0) {
                      // LEFT (Previous): Fading out to background left
                      // "Disappears to the left"
                      xVal = -150; 
                      scaleVal = 0.8;
                      opacityVal = 0; // Invisible
                      zIndexVal = 0;
                      rotateYVal = 5;
                  } else {
                      // RIGHT (Next): Coming from background right
                      // "Que se muestren aun en opacidad baja... vienen de la derecha"
                      // Stagger them
                      xVal = 50 + (diff * 40); 
                      scaleVal = 0.9 - (diff * 0.05);
                      // Low opacity for upcoming cards
                      opacityVal = 0.3 - (diff * 0.1); 
                      zIndexVal = 10 - diff;
                      rotateYVal = -5;
                  }

                  return (
                    <motion.div
                      key={feature.id}
                      onClick={nextSlide}
                      initial={false}
                      animate={{
                        x: xVal,
                        scale: scaleVal,
                        opacity: opacityVal,
                        zIndex: zIndexVal,
                        rotateY: rotateYVal
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute top-0 left-0 w-full h-full cursor-pointer will-change-transform"
                    >
                      {/* 
                          UPDATED STYLE:
                          - Background: #1c2938 (from prompt)
                      */}
                      <div className="w-full h-full rounded-[2.5rem] bg-[#1c2938] border border-white/10 overflow-hidden relative group shadow-2xl flex items-center justify-center">
                         
                         {/* Animated EKG/Pulse Background (Bottom Only) */}
                         <EKGGradient />

                         {/* Visual Content (Centered) */}
                         <div className="relative z-10 w-full h-full">
                            {feature.visual}
                         </div>

                         {/* Text Overlay (Bottom) */}
                         <div className="absolute bottom-6 left-6 right-6 z-20">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-3 bg-white/20 backdrop-blur-md border border-white/30 text-white">
                                <span className="text-xs font-bold uppercase tracking-wider">{feature.label}</span>
                            </div>
                            <div className="text-white">
                                <p className="text-sm opacity-80 mb-1 font-medium flex items-center gap-2">
                                    {feature.icon}
                                </p>
                                <p className="text-2xl md:text-3xl font-bold tracking-tight">{feature.title}</p>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
             </div>
             
             {/* Pagination Dots (Mobile) */}
             <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 lg:hidden">
                {featuresData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleManualChange(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'w-8 bg-[#27bea5]' : 'w-2 bg-gray-700'
                    }`}
                  />
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;