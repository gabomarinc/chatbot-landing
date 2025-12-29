import React from 'react';
import { Twitter, Instagram, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const Footer: React.FC = () => {
  return (
    // Removed bg-konsul-950, added bg-transparent
    <footer id="footer" className="bg-transparent pb-8 px-4 md:px-6 relative z-10">
      {/* Floating Container */}
      <div className="container mx-auto max-w-7xl bg-[#0B1219] rounded-[2.5rem] px-8 py-12 md:px-12 md:py-16 border border-white/5 relative overflow-hidden">
        
        {/* Top Grid: Newsletter, Links, Social */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Newsletter Section (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <Button variant="outline" size="sm" className="rounded-full mb-4">
              Descargar App
            </Button>
            <div>
                <h3 className="text-white font-medium mb-2">Recibe el boletín semanal de Konsul</h3>
                <div className="relative max-w-sm">
                    <div className="flex items-center bg-[#16202c] border border-white/10 rounded-full p-1 pl-4 focus-within:border-[#27bea5] transition-colors">
                        <Mail size={16} className="text-gray-500 mr-2" />
                        <input 
                            type="email" 
                            placeholder="Introduce tu email" 
                            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
                        />
                        <button className="bg-[#27bea5] hover:bg-[#1fa992] text-white rounded-full p-2 transition-colors">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* Links Columns (Middle) */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">General</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Nosotros</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Únete</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Eventos</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Producto</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Comprar</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Vender</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Cambiar</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Earn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Legal Hub</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Términos</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-400 text-sm mb-4">Ayuda</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">Soporte</a></li>
                <li><a href="#" className="text-white hover:text-[#27bea5] transition-colors">FAQ</a></li>
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
               {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#27bea5] transition-colors">
                     <Icon size={16} />
                  </a>
               ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal Text */}
        <div className="border-t border-white/5 pt-8">
           <p className="text-xs text-gray-500 leading-relaxed max-w-5xl">
             Konsul Digital S.L. (proveedor de la aplicación Konsul) está registrada como Proveedor de Servicios de Software y Automatización con el número de registro D945 y como Partner Oficial de Meta en el directorio de soluciones empresariales. El uso de la plataforma conlleva la aceptación de nuestros términos y condiciones de servicio. La automatización de ventas requiere supervisión humana para asegurar la calidad en la atención al cliente.
           </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;