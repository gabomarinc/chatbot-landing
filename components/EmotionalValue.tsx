import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Card = ({ title, value, label, img, darkBorder = false }: { title: string, value: string, label: string, img: string, darkBorder?: boolean }) => (
  // Updated background to #1c2938
  <div className={`relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-700 bg-[#1c2938] ${darkBorder ? 'border-2 border-gray-800' : ''}`}>
    <div className="absolute inset-0">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#1c2938] via-[#1c2938]/40 to-transparent" />
    
    <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-6 md:right-6">
      <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-2 md:mb-4 bg-white/20 backdrop-blur-md border border-white/30 text-white">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-white">
         <p className="text-xs md:text-sm opacity-80 mb-1 font-medium">{title}</p>
         <p className="text-xl md:text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

const EmotionalValue: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // CHANGED: Adjusted to "start 20%" to significantly delay the transition.
    // This ensures the section is well up the screen (title at top, card centered)
    // before the background expands, satisfying the "70% visible" requirement.
    offset: ["start 20%", "end end"]
  });

  // === TRIGGER LOGIC ===
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Trigger extremely early relative to the offset
    if (latest > 0.005 && !isExpanded) {
      setIsExpanded(true);
    } else if (latest < 0.005 && isExpanded) {
        setIsExpanded(false);
    }
  });

  // === UNIFIED TRANSITION CONFIGURATION ===
  const unifiedTransition = { 
    duration: 0.9, 
    ease: [0.25, 1, 0.5, 1] // Apple-style easing
  };

  // Dimensions configuration
  // Mobile: Reduced by 20% from (280x360) -> (224x288)
  // Desktop: 320px x 450px
  // The 'frame' adds ~6px to create the border effect before expansion
  const cardWidthMobile = 224;
  const cardHeightMobile = 288;
  const cardWidthDesktop = 320;
  const cardHeightDesktop = 450;

  const currentCardWidth = isMobile ? cardWidthMobile : cardWidthDesktop;
  const currentCardHeight = isMobile ? cardHeightMobile : cardHeightDesktop;
  
  const frameWidth = currentCardWidth + 6;
  const frameHeight = currentCardHeight + 6;

  return (
    // CHANGED: Removed pb-32 to avoid double padding. Now relies on inner container padding.
    <section ref={containerRef} className="relative h-auto md:h-[110vh] md:min-h-[800px] bg-konsul-950 font-sans overflow-hidden">
      
      {/* 
         CHANGED: Removed 'sticky top-0 h-screen' on mobile. 
         Now it flows naturally ('relative'), preventing content from being cut off 
         or the title from scrolling away before the user sees it.
         UPDATED: pt-24 match top padding.
      */}
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-24">
        
        {/* === CONTENT CONTAINER === */}
        {/* Removed overflow-y-auto since we are using natural flow on mobile now */}
        <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-start px-6 gap-2 md:gap-8 md:pb-10">

            {/* --- TITLES AREA --- */}
            <div className="relative w-full text-center h-[100px] md:h-[130px] flex items-end justify-center shrink-0 z-50 mb-2 md:mb-0">
                {/* Initial Dark Title */}
                <motion.div 
                    // CHANGED: Reduced y offset on mobile (-20) so it doesn't move up as much
                    animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? (isMobile ? -20 : -50) : 0, scale: isExpanded ? 0.9 : 1 }}
                    transition={unifiedTransition} 
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter drop-shadow-2xl leading-[0.9]">
                        Resultados que <br/> transforman negocios
                    </h2>
                </motion.div>

                {/* Light Title (Appears after expansion) */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 30 }}
                    transition={{ ...unifiedTransition, delay: 0.1 }} 
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="text-center px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 text-black tracking-tighter leading-tight">
                            Tu negocio, <br className="md:hidden"/> potenciado por IA.
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Automatiza procesos y multiplica tus resultados.
                        </p>
                    </div>
                </motion.div>
            </div>


            {/* --- MAIN ANCHOR CONTAINER --- */}
            {/* 
               Contains the Center Card and the Expanding Frame.
            */}
            <motion.div 
                className={`relative z-30 w-full flex items-center justify-center mt-4 md:mt-0`}
                animate={{ y: isExpanded ? (isMobile ? 0 : -40) : 10 }}
                transition={unifiedTransition}
            >
                
                {/* === EXPANDING BACKGROUND / BORDER === */}
                <motion.div
                    animate={{
                        width: isExpanded ? '150vw' : `${frameWidth}px`, 
                        // CHANGED: Increased mobile height to 230vh.
                        // Since the background expands from the center of the first card, 
                        // 230vh ensures it extends far enough DOWN to cover the 2nd and 3rd cards 
                        // in the vertical stack.
                        height: isExpanded ? (isMobile ? '230vh' : '120vh') : `${frameHeight}px`, 
                        borderRadius: isExpanded ? '0rem' : '2.7rem'
                    }}
                    transition={unifiedTransition} 
                    className="absolute bg-white pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        x: '-50%',
                        y: '-50%',
                        zIndex: 0 
                    }}
                />

                {/* === DESKTOP LAYOUT (Horizontal) === */}
                
                {/* LEFT CARD (Desktop) */}
                <motion.div 
                    className={`hidden md:block absolute w-[320px] h-[450px] z-20`}
                    initial={{ x: 0, opacity: 0, scale: 0.85 }}
                    animate={{ 
                        x: isExpanded ? -380 : 0,
                        opacity: isExpanded ? 1 : 0,
                        scale: isExpanded ? 1 : 0.85
                    }}
                    transition={unifiedTransition}
                >
                      <Card 
                        title="Tasa de Respuesta"
                        value="< 1 min"
                        label="Velocidad"
                        img="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800"
                        darkBorder={true}
                      />
                </motion.div>


                {/* CENTER CARD (The Anchor) */}
                <div 
                  className={`relative z-10 shrink-0`}
                  style={{ 
                    width: isMobile ? `${cardWidthMobile}px` : `${cardWidthDesktop}px`, 
                    height: isMobile ? `${cardHeightMobile}px` : `${cardHeightDesktop}px`
                  }}
                >
                     {/* Card Content */}
                     <div className="w-full h-full relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[#1c2938]">
                          <Card 
                            title="Aumento en Ventas"
                            value="+300%"
                            label="Crecimiento"
                            img="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                            darkBorder={false}
                          />
                     </div>
                </div>


                {/* RIGHT CARD (Desktop) */}
                <motion.div 
                    className={`hidden md:block absolute w-[320px] h-[450px] z-20`}
                    initial={{ x: 0, opacity: 0, scale: 0.85 }}
                    animate={{ 
                        x: isExpanded ? 380 : 0,
                        opacity: isExpanded ? 1 : 0,
                        scale: isExpanded ? 1 : 0.85
                    }}
                    transition={unifiedTransition}
                >
                      <Card 
                        title="Tasa de Apertura"
                        value="98%"
                        label="Marketing"
                        img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                        darkBorder={true}
                      />
                </motion.div>

            </motion.div>

            {/* === MOBILE STACK (Vertical) === */}
            {/* 
                Vertical stack for mobile.
                UPDATED: pb-40 (160px) to visually match the top margin (pt-24 + title offset ≈ 156px).
            */}
            <div className="md:hidden flex flex-col items-center gap-6 mt-6 w-full z-30 pb-40">
                {/* Card 2: Response Rate */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                        opacity: isExpanded ? 1 : 0, 
                        y: isExpanded ? 0 : 50,
                        // Fix: Use explicit pixel height
                        height: isExpanded ? cardHeightMobile : 0 
                    }}
                    transition={{ ...unifiedTransition, delay: 0.1 }}
                    style={{ width: cardWidthMobile }}
                    className="shrink-0 relative overflow-hidden"
                >
                     <Card 
                        title="Tasa de Respuesta"
                        value="< 1 min"
                        label="Velocidad"
                        img="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800"
                        darkBorder={true}
                      />
                </motion.div>

                {/* Card 3: Open Rate */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                        opacity: isExpanded ? 1 : 0, 
                        y: isExpanded ? 0 : 50,
                        // Fix: Use explicit pixel height
                        height: isExpanded ? cardHeightMobile : 0 
                    }}
                    transition={{ ...unifiedTransition, delay: 0.2 }}
                    style={{ width: cardWidthMobile }}
                    className="shrink-0 relative overflow-hidden"
                >
                     <Card 
                        title="Tasa de Apertura"
                        value="98%"
                        label="Marketing"
                        img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                        darkBorder={true}
                      />
                </motion.div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default EmotionalValue;