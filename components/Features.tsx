import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, BarChart3, Users, ArrowRight, CheckCircle2, Globe, Mail, Zap, Smartphone, Headphones, Instagram, Facebook } from 'lucide-react';
import Button from './ui/Button';

// Reusing the exact card dimensions and style logic from EmotionalValue
// Card Size: w-[320px] h-[450px]
// Border Radius: rounded-[2.5rem]

const featuresData = [
  {
    id: 0,
    title: "Atención omnicanal",
    label: "Centralización",
    description: "Web, WhatsApp y redes sociales.",
    icon: <Globe className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        {/* Central Hub Visualization */}
        <div className="relative flex items-center justify-center w-full h-full">
            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full animate-spin [animation-duration:10s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
            
            {/* WhatsApp (Top) */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#25D366]/20 p-2.5 rounded-full border border-[#25D366]/30 text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-transform hover:scale-110">
                {/* Custom WhatsApp SVG for brand accuracy */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </div>

            {/* Instagram (Right) */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 p-[1.5px] rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] shadow-[0_0_15px_rgba(253,29,29,0.3)] transition-transform hover:scale-110">
               <div className="bg-[#1c2938] p-2 rounded-[10px]">
                  <Instagram size={20} className="text-white" />
               </div>
            </div>

            {/* Facebook (Bottom) */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#1877F2]/20 p-2.5 rounded-full border border-[#1877F2]/30 text-[#1877F2] shadow-[0_0_15px_rgba(24,119,242,0.3)] transition-transform hover:scale-110">
               {/* Custom Facebook SVG for filled style */}
               <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            
            {/* Web (Left) */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 bg-cyan-500/20 p-2.5 rounded-full border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform hover:scale-110">
               <Globe size={20} />
            </div>

            {/* Core */}
            <div className="relative z-10 w-20 h-20 bg-[#1c2938] rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(39,190,165,0.2)] flex items-center justify-center">
                <div className="w-12 h-12 bg-[#27bea5] rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Users size={24} />
                </div>
                {/* Notification Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#1c2938]">
                    4
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: "Panel de analítica",
    label: "Datos en Tiempo Real",
    description: "Decisiones basadas en datos, no en corazonadas.",
    icon: <BarChart3 className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center px-6 pb-12">
         <div className="w-full h-40 bg-[#1c2938]/60 border border-white/10 rounded-xl p-4 relative overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col justify-end">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
               <span className="text-[10px] text-gray-400 uppercase font-bold">Rendimiento Semanal</span>
               <div className="flex items-center gap-1 text-[#27bea5] bg-[#27bea5]/10 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27bea5] animate-pulse" />
                  <span className="text-[9px] font-bold">Live</span>
               </div>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-24">
               {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                 <div key={i} className="w-full bg-[#27bea5]/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-[#27bea5]/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
         </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Transferencia fluida",
    label: "Handoff Híbrido",
    description: "Escalamiento inteligente cuando es necesario.",
    icon: <Headphones className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
         <div className="w-full space-y-4 relative z-10">
             {/* Bot Message */}
             <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center shrink-0">
                     <Bot size={14} className="text-white" />
                 </div>
                 <div className="bg-[#16202c] border border-white/10 p-3 rounded-2xl rounded-tl-none text-[10px] text-gray-300 shadow-sm max-w-[80%]">
                     Entendido. Te conectaré con un especialista ahora mismo.
                 </div>
             </div>

             {/* Connection Animation */}
             <div className="flex items-center justify-center gap-2 py-1">
                 <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#27bea5] to-transparent opacity-50" />
                 <span className="text-[9px] text-[#27bea5] font-bold uppercase tracking-widest">Escalando</span>
                 <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#27bea5] to-transparent opacity-50" />
             </div>

             {/* Human Agent Entry */}
             <div className="bg-[#1c2938] border border-[#27bea5]/30 p-3 rounded-xl flex items-center gap-3 shadow-lg relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#27bea5]" />
                 <div className="w-10 h-10 rounded-full bg-[#27bea5] flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                     S
                 </div>
                 <div>
                     <p className="text-xs font-bold text-white">Sofía se ha unido</p>
                     <p className="text-[10px] text-gray-400">Gerente de Soporte</p>
                 </div>
                 <div className="ml-auto flex gap-1">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75" />
                 </div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Generación de leads",
    label: "Oportunidades",
    description: "Identifica oportunidades automáticamente.",
    icon: <Zap className="text-white" size={24} />,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
         {/* Lead Card */}
         <div className="w-64 bg-[#1c2938] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-colors" />

            <div className="flex justify-between items-start mb-5 relative z-10">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                     JP
                  </div>
                  <div>
                      <div className="h-2 w-20 bg-gray-600/50 rounded-full mb-1.5" />
                      <div className="h-1.5 w-12 bg-gray-700/50 rounded-full" />
                  </div>
               </div>
               <div className="px-2 py-0.5 rounded border border-green-500/30 bg-green-500/10 text-green-400 text-[9px] font-bold uppercase tracking-wide">
                  Hot Lead
               </div>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-500 font-medium">Probabilidad de Cierre</span>
                    <span className="text-sm font-bold text-white">94%</span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-red-500 w-[94%]" />
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
                <div className="px-2 py-1 bg-white/5 rounded text-[9px] text-gray-400">Interesado</div>
                <div className="px-2 py-1 bg-white/5 rounded text-[9px] text-gray-400">Presupuesto Alto</div>
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
              Olvídate de atender manualmente. Kônsul automatiza todo lo que necesitas para escalar tu atención al cliente y ventas por chat.
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
