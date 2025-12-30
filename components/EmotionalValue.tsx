import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Card = ({ title, value, label, img, darkBorder = false }: { title: string, value: string, label: string, img: string, darkBorder?: boolean }) => (
  // Updated background to #1c2938
  <div className={`relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-700 bg-[#1c2938] ${darkBorder ? 'border-2 border-gray-800' : ''}`}>
    
    {/* Image Container: Absolute inset-0 to occupy full background */}
    <div className="absolute inset-0">
      <img 
        src={img} 
        alt={title} 
        // object-cover: Occupies full background
        // object-center: Centers the image content
        // opacity-100: Real colors
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
      />
    </div>

    {/* Dark Gradient Overlay: Only at the bottom for text readability */}
    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#1c2938] via-[#1c2938]/80 to-transparent pointer-events-none" />
    
    {/* Content Container: Anchored to bottom, z-10 to sit above image/gradient */}
    <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-6 md:right-6 z-10">
      <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-2 md:mb-4 bg-[#27bea5]/10 backdrop-blur-md border border-[#27bea5]/20 text-[#27bea5]">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-white">
         <p className="text-xs md:text-sm opacity-90 mb-1 font-medium text-gray-200">{title}</p>
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
    offset: ["start 20%", "end end"]
  });

  // === TRIGGER LOGIC ===
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.005 && !isExpanded) {
      setIsExpanded(true);
    } else if (latest < 0.005 && isExpanded) {
        setIsExpanded(false);
    }
  });

  // === UNIFIED TRANSITION CONFIGURATION ===
  const unifiedTransition = { 
    duration: 0.9, 
    ease: [0.25, 1, 0.5, 1] 
  };

  // Dimensions configuration
  const cardWidthMobile = 224;
  const cardHeightMobile = 288;
  const cardWidthDesktop = 320;
  const cardHeightDesktop = 450;

  const currentCardWidth = isMobile ? cardWidthMobile : cardWidthDesktop;
  const currentCardHeight = isMobile ? cardHeightMobile : cardHeightDesktop;
  
  const frameWidth = currentCardWidth + 6;
  const frameHeight = currentCardHeight + 6;

  return (
    <section ref={containerRef} id="emotional" className="relative h-auto md:h-[110vh] md:min-h-[800px] bg-konsul-950 font-sans overflow-hidden">
      
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-24">
        
        {/* === CONTENT CONTAINER === */}
        <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-start px-6 gap-2 md:gap-8 md:pb-10">

            {/* --- TITLES AREA --- */}
            <div className="relative w-full text-center h-[100px] md:h-[130px] flex items-end justify-center shrink-0 z-50 mb-2 md:mb-0">
                {/* Initial Dark Title */}
                <motion.div 
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
            <motion.div 
                className={`relative z-30 w-full flex items-center justify-center mt-4 md:mt-0`}
                animate={{ y: isExpanded ? (isMobile ? 0 : -40) : 10 }}
                transition={unifiedTransition}
            >
                
                {/* === EXPANDING BACKGROUND / BORDER === */}
                <motion.div
                    animate={{
                        width: isExpanded ? '150vw' : `${frameWidth}px`, 
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
                        title="velocidad de respuesta"
                        value="+100%"
                        label="Velocidad"
                        img="https://konsul.digital/wp-content/uploads/2025/12/velocidad-icon.avif"
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
                            title="tareas manuales"
                            value="-50%"
                            label="Eficiencia"
                            img="https://konsul.digital/wp-content/uploads/2025/12/eficiencia-icon.avif"
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
                        title="leads calificados"
                        value="+30%"
                        label="Leads"
                        img="https://konsul.digital/wp-content/uploads/2025/12/leads-icon.avif"
                        darkBorder={true}
                      />
                </motion.div>

            </motion.div>

            {/* === MOBILE STACK (Vertical) === */}
            <div className="md:hidden flex flex-col items-center gap-6 mt-6 w-full z-30 pb-40">
                {/* Card 2: Response Rate */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                        opacity: isExpanded ? 1 : 0, 
                        y: isExpanded ? 0 : 50,
                        height: isExpanded ? cardHeightMobile : 0 
                    }}
                    transition={{ ...unifiedTransition, delay: 0.1 }}
                    style={{ width: cardWidthMobile }}
                    className="shrink-0 relative overflow-hidden"
                >
                     <Card 
                        title="velocidad de respuesta"
                        value="+100%"
                        label="Velocidad"
                        img="https://konsul.digital/wp-content/uploads/2025/12/velocidad-icon.avif"
                        darkBorder={true}
                      />
                </motion.div>

                {/* Card 3: Leads */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                        opacity: isExpanded ? 1 : 0, 
                        y: isExpanded ? 0 : 50,
                        height: isExpanded ? cardHeightMobile : 0 
                    }}
                    transition={{ ...unifiedTransition, delay: 0.2 }}
                    style={{ width: cardWidthMobile }}
                    className="shrink-0 relative overflow-hidden"
                >
                     <Card 
                        title="leads calificados"
                        value="+30%"
                        label="Leads"
                        img="https://konsul.digital/wp-content/uploads/2025/12/leads-icon.avif"
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