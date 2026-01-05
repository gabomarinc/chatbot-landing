import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   ArrowRight, MessageSquare, LayoutGrid, Bot, Users, Radio, UserCircle,
   CreditCard, Calendar, Activity, Globe, Clock, Smartphone, ChevronRight, ChevronLeft,
   Search, Filter, Download, MoreHorizontal, Phone, Mail, MapPin, X, Zap, Plus, Settings, FileText,
   Shield, LogOut, Check, MoreVertical, Trash2, Copy, Code, Eye
} from 'lucide-react';
import Button from './ui/Button';

// ... [Keep existing interfaces and data arrays unchanged] ...
interface Message {
   id: string;
   role: 'user' | 'bot';
   text: string;
}

const containerVariants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05
      }
   }
};

const itemVariants = {
   hidden: { opacity: 0, y: 10 },
   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const channelsData = [
   {
      id: 1,
      name: "Chat Web",
      type: "WEBCHAT",
      status: "CONECTADO",
      agent: "Carla",
      icon: <Globe size={24} />,
      color: "bg-blue-500/10 text-blue-400",
      scriptId: "kw-29384-web"
   },
   {
      id: 2,
      name: "WhatsApp Ventas",
      type: "WHATSAPP",
      status: "CONECTADO",
      agent: "Luis",
      icon: <MessageSquare size={24} />,
      color: "bg-green-500/10 text-green-400",
      scriptId: "wa-99821-api"
   },
   {
      id: 3,
      name: "Instagram DMs",
      type: "INSTAGRAM",
      status: "PENDIENTE",
      agent: "Sin Asignar",
      icon: <Smartphone size={24} />,
      color: "bg-pink-500/10 text-pink-400",
      scriptId: "ig-11200-api"
   }
];

const ChannelsView = () => {
   const [selectedChannel, setSelectedChannel] = useState<any | null>(null);
   const [copied, setCopied] = useState(false);

   const handleCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="flex h-full relative overflow-hidden">
         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20 }}
            className={`flex-1 h-full bg-[#16202c] overflow-y-auto p-4 md:p-6 space-y-6 transition-all duration-300 ${selectedChannel ? 'w-full md:w-1/2 opacity-50 pointer-events-none md:pointer-events-auto md:opacity-100' : 'w-full'}`}
         >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
               <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-white">Canales</h2>
                  <p className="text-xs text-gray-500">Conecta tus agentes con el mundo a través de múltiples plataformas</p>
               </motion.div>
               <motion.div variants={itemVariants}>
                  <button className="flex items-center gap-2 bg-[#27bea5] hover:bg-[#1fa992] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-[#27bea5]/20 group">
                     <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                     Conectar Nuevo Canal
                  </button>
               </motion.div>
            </div>
            <div className="space-y-4">
               {channelsData.map(channel => (
                  <motion.div
                     key={channel.id}
                     variants={itemVariants}
                     layoutId={`channel-card-${channel.id}`}
                     onClick={() => setSelectedChannel(channel)}
                     className={`group bg-[#1c2938] hover:bg-[#233346] border rounded-2xl p-5 cursor-pointer transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden ${selectedChannel?.id === channel.id ? 'border-[#27bea5] bg-[#233346]' : 'border-white/5'}`}
                  >
                     <div className={`w-16 h-16 rounded-2xl ${channel.color} flex items-center justify-center shrink-0 border border-white/5 shadow-inner`}>
                        {channel.icon}
                     </div>
                     <div className="flex-1 min-w-0 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                           <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                           <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${channel.status === 'CONECTADO'
                              ? 'bg-green-500/10 text-green-400 border-green-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                              }`}>
                              {channel.status}
                           </span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-400">
                           <span className="flex items-center gap-1">
                              <span className="font-bold text-gray-500">AGENTE:</span> {channel.agent}
                           </span>
                           <span className="w-1 h-1 rounded-full bg-gray-600" />
                           <span className="flex items-center gap-1">
                              <span className="font-bold text-gray-500">TIPO:</span> {channel.type}
                           </span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        <button className="px-4 py-2 bg-[#16202c] hover:bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white transition-colors">
                           Configurar
                        </button>
                        <button className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-xl transition-colors">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
         <AnimatePresence>
            {selectedChannel && (
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute top-0 right-0 w-full md:w-[450px] h-full bg-[#1c2938] border-l border-white/10 shadow-2xl z-20 flex flex-col"
               >
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#16202c]">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${selectedChannel.color} flex items-center justify-center`}>
                           {React.cloneElement(selectedChannel.icon, { size: 20 })}
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-white">{selectedChannel.name}</h3>
                           <p className="text-xs text-gray-500">ID: {selectedChannel.scriptId}</p>
                        </div>
                     </div>
                     <button
                        onClick={() => setSelectedChannel(null)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                     >
                        <X size={18} />
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                     <div className="flex gap-1 bg-[#16202c] p-1 rounded-xl border border-white/5">
                        <button className="flex-1 py-2 text-xs font-bold text-white bg-[#1c2938] rounded-lg shadow-sm">Configuración</button>
                        <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-white">Instalación</button>
                        <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-white">Logs</button>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Apariencia del Widget</label>
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs text-white mb-2 font-medium">Nombre Público</label>
                              <input
                                 type="text"
                                 defaultValue="Soporte Konsul"
                                 className="w-full bg-[#16202c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#27bea5]"
                              />
                           </div>
                           <div>
                              <label className="block text-xs text-white mb-2 font-medium">Mensaje de Bienvenida</label>
                              <textarea
                                 defaultValue="¡Hola! 👋 ¿En qué podemos ayudarte hoy?"
                                 className="w-full bg-[#16202c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#27bea5] min-h-[80px] resize-none"
                              />
                           </div>
                           <div>
                              <label className="block text-xs text-white mb-2 font-medium">Color del Brand</label>
                              <div className="flex gap-3">
                                 {['#27bea5', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b'].map(c => (
                                    <div key={c} className={`w-8 h-8 rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-[#1c2938] ${c === '#27bea5' ? 'ring-white' : 'ring-transparent'}`} style={{ backgroundColor: c }} />
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Snippet de Instalación</label>
                        <div className="relative group">
                           <div className="absolute top-3 right-3">
                              <button
                                 onClick={handleCopy}
                                 className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white transition-colors"
                              >
                                 {copied ? <Check size={12} /> : <Copy size={12} />}
                                 {copied ? 'Copiado' : 'Copiar'}
                              </button>
                           </div>
                           <pre className="bg-[#16202c] border border-white/10 rounded-xl p-4 text-[10px] text-gray-400 font-mono overflow-x-auto leading-relaxed">
                              <code>{`<script>
  window.konsulSettings = {
    client_id: '${selectedChannel.scriptId}',
    color: '#27bea5'
  };
</script>
<script 
  async 
  src="https://cdn.konsul.digital/widget.js">
</script>`}</code>
                           </pre>
                        </div>
                        <p className="mt-3 text-[10px] text-gray-500 flex items-center gap-1">
                           <Code size={12} />
                           Pega este código antes de la etiqueta <code className="text-gray-300 mx-1">/body</code> de tu sitio web.
                        </p>
                     </div>
                  </div>
                  <div className="p-5 border-t border-white/5 bg-[#16202c] flex gap-3">
                     <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-white">
                        Previsualizar
                     </Button>
                     <Button className="flex-1 bg-[#27bea5] hover:bg-[#1fa992]">
                        Guardar Cambios
                     </Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

const teamData = [
   {
      id: 1,
      name: "Omar Ortiz",
      email: "omar@konsul.digital",
      role: "Propietario",
      roleType: "owner",
      status: "Activo",
      isOnline: true,
      lastLogin: "hace alrededor de 1 hora",
      avatarColor: "bg-[#27bea5]/10 text-[#27bea5]"
   },
   {
      id: 2,
      name: "Efraín Losada",
      email: "ortizalfano@gmail.com",
      role: "Agente",
      roleType: "agent",
      status: "Desconectado",
      isOnline: false,
      lastLogin: "hace alrededor de 3 horas",
      avatarColor: "bg-purple-500/10 text-purple-400"
   },
   {
      id: 3,
      name: "Sofía Méndez",
      email: "sofia.m@konsul.digital",
      role: "Admin",
      roleType: "admin",
      status: "Activo",
      isOnline: true,
      lastLogin: "hace 5 minutos",
      avatarColor: "bg-blue-500/10 text-blue-400"
   }
];

const TeamView = () => {
   const [selectedMember, setSelectedMember] = useState<any | null>(null);

   return (
      <div className="flex h-full relative overflow-hidden">
         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20 }}
            className={`flex-1 h-full bg-[#16202c] overflow-y-auto p-4 md:p-6 space-y-6 transition-all duration-300 ${selectedMember ? 'w-full md:w-1/2 opacity-50 pointer-events-none md:pointer-events-auto md:opacity-100' : 'w-full'}`}
         >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
               <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-1">
                     <h2 className="text-xl font-bold text-white">Equipo</h2>
                  </div>
                  <div className="flex items-center gap-2">
                     <p className="text-xs text-gray-500">Gestiona los permisos y accesos de tus colaboradores</p>
                     <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 flex items-center gap-1">
                        <Users size={10} /> {teamData.length}/5 miembros
                     </span>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants}>
                  <button className="flex items-center gap-2 bg-[#27bea5] hover:bg-[#1fa992] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-[#27bea5]/20 group">
                     <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                     Invitar Colaborador
                  </button>
               </motion.div>
            </div>
            <motion.div variants={itemVariants} className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 pb-4 hidden md:grid">
               <div className="col-span-4">Usuario / Email</div>
               <div className="col-span-2">Rol del Sistema</div>
               <div className="col-span-2">Estado</div>
               <div className="col-span-3">Último Login</div>
               <div className="col-span-1 text-right">Acciones</div>
            </motion.div>
            <div className="space-y-3">
               {teamData.map(member => (
                  <motion.div
                     key={member.id}
                     variants={itemVariants}
                     layoutId={`team-row-${member.id}`}
                     onClick={() => setSelectedMember(member)}
                     className={`group relative bg-[#1c2938] hover:bg-[#233346] border border-white/5 rounded-2xl p-4 md:py-4 transition-all cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-4 items-center ${selectedMember?.id === member.id ? 'border-[#27bea5] bg-[#233346]' : ''}`}
                  >
                     <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${member.avatarColor} flex items-center justify-center text-lg font-bold border border-white/5`}>
                           {member.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                           <h4 className="text-sm font-bold text-white truncate">{member.name}</h4>
                           <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Mail size={10} />
                              <span className="truncate">{member.email}</span>
                           </div>
                        </div>
                     </div>
                     <div className="hidden md:flex col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${member.roleType === 'owner'
                           ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                           : member.roleType === 'admin'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                           }`}>
                           {member.roleType === 'owner' && <Shield size={10} />}
                           {member.role}
                        </span>
                     </div>
                     <div className="hidden md:flex col-span-2 items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`} />
                        <span className={`text-xs font-medium ${member.isOnline ? 'text-white' : 'text-gray-500'}`}>
                           {member.status}
                        </span>
                     </div>
                     <div className="hidden md:block col-span-3 text-xs text-gray-400">
                        {member.lastLogin}
                     </div>
                     <div className="hidden md:block col-span-1 text-right">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                           <MoreVertical size={16} />
                        </button>
                     </div>
                     <div className="md:hidden flex justify-between items-center w-full border-t border-white/5 pt-3 mt-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${member.roleType === 'owner' ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-400'
                           }`}>
                           {member.role}
                        </span>
                        <span className={`text-xs flex items-center gap-1.5 ${member.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${member.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                           {member.status}
                        </span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
         <AnimatePresence>
            {selectedMember && (
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-[#1c2938] border-l border-white/10 shadow-2xl z-20 flex flex-col"
               >
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#16202c]">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${selectedMember.avatarColor} flex items-center justify-center text-xl font-bold border border-white/10 shadow-inner`}>
                           {selectedMember.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-white">{selectedMember.name}</h3>
                           <p className="text-xs text-gray-500">{selectedMember.email}</p>
                        </div>
                     </div>
                     <button
                        onClick={() => setSelectedMember(null)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                     >
                        <X size={18} />
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Rol del Usuario</label>
                        <div className="bg-[#16202c] rounded-xl border border-white/5 p-1 flex gap-1">
                           {['Agente', 'Admin', 'Propietario'].map((role) => (
                              <button
                                 key={role}
                                 className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${(selectedMember.role === role) || (selectedMember.roleType === 'owner' && role === 'Propietario')
                                    ? 'bg-[#27bea5] text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                              >
                                 {role}
                              </button>
                           ))}
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Permisos de Acceso</label>
                        <div className="space-y-3">
                           {[
                              { label: "Acceso a Facturación", desc: "Puede ver y descargar facturas", active: selectedMember.roleType === 'owner' },
                              { label: "Gestión de Agentes", desc: "Puede crear y editar agentes de IA", active: true },
                              { label: "Exportar Datos", desc: "Descargar listas de prospectos", active: selectedMember.roleType !== 'agent' },
                              { label: "Configuración del Sistema", desc: "Modificar ajustes globales", active: selectedMember.roleType === 'owner' },
                           ].map((perm, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-[#16202c]/50">
                                 <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${perm.active ? 'bg-[#27bea5] border-[#27bea5] text-white' : 'border-gray-600 bg-transparent'}`}>
                                    {perm.active && <Check size={12} strokeWidth={3} />}
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-white">{perm.label}</p>
                                    <p className="text-[10px] text-gray-500">{perm.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Actividad Reciente</label>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-[#16202c] p-3 rounded-xl border border-white/5">
                              <div className="text-2xl font-bold text-white mb-1">24</div>
                              <div className="text-[10px] text-gray-500 font-medium">Chats Atendidos (Semana)</div>
                           </div>
                           <div className="bg-[#16202c] p-3 rounded-xl border border-white/5">
                              <div className="text-2xl font-bold text-white mb-1">1.2h</div>
                              <div className="text-[10px] text-gray-500 font-medium">Tiempo Prom. Respuesta</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-5 border-t border-white/5 bg-[#16202c]">
                     {selectedMember.roleType === 'owner' ? (
                        <p className="text-center text-xs text-gray-500">No puedes eliminar la cuenta del propietario.</p>
                     ) : (
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
                           <LogOut size={16} />
                           Eliminar del Equipo
                        </button>
                     )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const agentsData = [
   {
      id: 1,
      name: "Luis",
      initial: "L",
      status: "ACTIVO",
      color: "bg-[#0d9488]", // Teal 600
      channels: 1,
      chats: 1,
      points: 0
   },
   {
      id: 2,
      name: "Carla",
      initial: "C",
      status: "ACTIVO",
      color: "bg-[#14b8a6]", // Teal 500
      channels: 1,
      chats: 3,
      points: 0
   }
];

const AgentsView = () => {
   const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

   return (
      <div className="flex h-full relative overflow-hidden">
         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20 }}
            className={`flex-1 h-full bg-[#16202c] overflow-y-auto p-4 md:p-6 space-y-6 transition-all duration-300 ${selectedAgent ? 'w-full md:w-1/2 opacity-50 pointer-events-none md:pointer-events-auto md:opacity-100' : 'w-full'}`}
         >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
               <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-white">Agentes</h2>
                  <p className="text-xs text-gray-500">Crea, entrena y gestiona tus agentes de IA personalizados</p>
               </motion.div>
               <motion.div variants={itemVariants}>
                  <button className="flex items-center gap-2 bg-[#27bea5] hover:bg-[#1fa992] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-[#27bea5]/20 group">
                     <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                     Crear Nuevo Agente
                  </button>
               </motion.div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
               {agentsData.map(agent => (
                  <motion.div
                     key={agent.id}
                     variants={itemVariants}
                     layoutId={`agent-card-${agent.id}`}
                     onClick={() => setSelectedAgent(agent)}
                     className={`bg-[#1c2938] border rounded-2xl p-5 cursor-pointer group transition-all relative overflow-hidden ${selectedAgent?.id === agent.id ? 'border-[#27bea5] ring-1 ring-[#27bea5]' : 'border-white/5 hover:border-white/10 hover:shadow-xl'}`}
                  >
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                              {agent.initial}
                           </div>
                           <div>
                              <h3 className="text-base font-bold text-white">{agent.name}</h3>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-[#27bea5]/10 text-[#27bea5] mt-1 border border-[#27bea5]/20">
                                 {agent.status}
                              </span>
                           </div>
                        </div>
                        <button className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg">
                           <MoreHorizontal size={18} />
                        </button>
                     </div>
                     <div className="flex items-center justify-between bg-[#16202c]/50 rounded-xl p-4 border border-white/5 mb-6 group-hover:bg-[#16202c] transition-colors">
                        <div className="text-center px-2 flex-1">
                           <div className="flex justify-center mb-1 text-[#27bea5] p-1.5 bg-[#27bea5]/10 rounded-full w-fit mx-auto"><LayoutGrid size={14} /></div>
                           <div className="text-lg font-bold text-white">{agent.channels}</div>
                           <div className="text-[9px] text-gray-500 font-bold tracking-wider">CANALES</div>
                        </div>
                        <div className="w-px h-8 bg-white/5" />
                        <div className="text-center px-2 flex-1">
                           <div className="flex justify-center mb-1 text-blue-400 p-1.5 bg-blue-500/10 rounded-full w-fit mx-auto"><MessageSquare size={14} /></div>
                           <div className="text-lg font-bold text-white">{agent.chats}</div>
                           <div className="text-[9px] text-gray-500 font-bold tracking-wider">CHATS</div>
                        </div>
                        <div className="w-px h-8 bg-white/5" />
                        <div className="text-center px-2 flex-1">
                           <div className="flex justify-center mb-1 text-orange-400 p-1.5 bg-orange-500/10 rounded-full w-fit mx-auto"><Zap size={14} /></div>
                           <div className="text-lg font-bold text-white">{agent.points}</div>
                           <div className="text-[9px] text-gray-500 font-bold tracking-wider">PUNTOS</div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex -space-x-2 pl-2">
                           <div className="w-7 h-7 rounded-full bg-[#1c2938] border border-white/10 flex items-center justify-center text-gray-400 z-10 shadow-sm"><MessageSquare size={12} /></div>
                           <div className="w-7 h-7 rounded-full bg-[#1c2938] border border-white/10 flex items-center justify-center text-gray-400 shadow-sm"><Globe size={12} /></div>
                        </div>
                        <span className="text-xs font-bold text-[#27bea5] flex items-center gap-1 group-hover:underline cursor-pointer">
                           Configurar Agente <Settings size={12} />
                        </span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
         <AnimatePresence>
            {selectedAgent && (
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-[#1c2938] border-l border-white/10 shadow-2xl z-20 flex flex-col"
               >
                  <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#16202c]">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${selectedAgent.color} flex items-center justify-center text-white font-bold`}>
                           {selectedAgent.initial}
                        </div>
                        <div>
                           <h3 className="text-sm font-bold text-white">Configurar {selectedAgent.name}</h3>
                           <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <p className="text-[10px] text-gray-400">En línea</p>
                           </div>
                        </div>
                     </div>
                     <button
                        onClick={() => setSelectedAgent(null)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                     >
                        <X size={16} />
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                     <div>
                        <div className="flex items-center justify-between mb-3">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Personalidad</label>
                           <button className="text-[10px] text-[#27bea5] hover:underline">Editar</button>
                        </div>
                        <div className="p-4 bg-[#16202c] border border-white/5 rounded-xl space-y-4">
                           <div>
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-sm text-white font-medium">Tono de Voz</span>
                                 <span className="text-xs text-[#27bea5] bg-[#27bea5]/10 px-2 py-0.5 rounded-full">Profesional y Amable</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-[#27bea5] w-3/4 h-full rounded-full" />
                              </div>
                              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                                 El agente responderá de manera cortés, priorizando la resolución de problemas y manteniendo un lenguaje formal pero cercano.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Base de Conocimiento</label>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-4 bg-[#16202c] border border-white/5 rounded-xl flex flex-col items-center gap-3 text-center hover:border-[#27bea5]/50 cursor-pointer transition-all group">
                              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform"><Globe size={20} /></div>
                              <div>
                                 <span className="text-xs text-white font-bold block">Sitio Web</span>
                                 <span className="text-[10px] text-gray-500">Sincronizado</span>
                              </div>
                           </div>
                           <div className="p-4 bg-[#16202c] border border-white/5 rounded-xl flex flex-col items-center gap-3 text-center hover:border-[#27bea5]/50 cursor-pointer transition-all group">
                              <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-lg group-hover:scale-110 transition-transform"><FileText size={20} /></div>
                              <div>
                                 <span className="text-xs text-white font-bold block">Documentos</span>
                                 <span className="text-[10px] text-gray-500">3 Archivos</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Canales Activos</label>
                        <div className="space-y-2">
                           <div className="flex items-center justify-between p-3 bg-[#16202c] rounded-xl border border-white/5">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-[#27bea5]/10 flex items-center justify-center text-[#27bea5]"><Globe size={16} /></div>
                                 <span className="text-sm text-white font-medium">Widget Web</span>
                              </div>
                              <div className="w-10 h-5 bg-[#27bea5] rounded-full relative cursor-pointer">
                                 <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                              </div>
                           </div>
                           <div className="flex items-center justify-between p-3 bg-[#16202c] rounded-xl border border-white/5 opacity-60">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><MessageSquare size={16} /></div>
                                 <span className="text-sm text-white font-medium">WhatsApp</span>
                              </div>
                              <div className="w-10 h-5 bg-gray-600 rounded-full relative cursor-pointer">
                                 <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-5 border-t border-white/5 bg-[#16202c] space-y-3">
                     <Button className="w-full bg-[#27bea5] hover:bg-[#1fa992]">Guardar Cambios</Button>
                     <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">Desactivar Agente</Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

const prospectsData = [
   {
      id: 1,
      name: "Rubén González",
      contact: "+52 55 1234 5678",
      date: "29 dic, 2025",
      time: "13:01 hs",
      agent: "Luis",
      agentColor: "bg-blue-500/10 text-blue-400",
      msgs: 22,
      email: "ruben.gonz@gmail.com",
      location: "Ciudad de México",
      status: "Caliente"
   },
   {
      id: 2,
      name: "Gustavo Gaviria",
      contact: "+57 300 987 6543",
      date: "28 dic, 2025",
      time: "18:18 hs",
      agent: "Carla",
      agentColor: "bg-purple-500/10 text-purple-400",
      msgs: 15,
      email: "gustavo.g@hotmail.com",
      location: "Bogotá, COL",
      status: "Seguimiento"
   },
   {
      id: 3,
      name: "Omar Paredes",
      contact: "+54 9 11 4567 8901",
      date: "26 dic, 2025",
      time: "17:56 hs",
      agent: "Carla",
      agentColor: "bg-purple-500/10 text-purple-400",
      msgs: 12,
      email: "omar.paredes@yahoo.com",
      location: "Buenos Aires, ARG",
      status: "Nuevo"
   },
   {
      id: 4,
      name: "Ana Martínez",
      contact: "+34 600 111 222",
      date: "26 dic, 2025",
      time: "10:30 hs",
      agent: "Luis",
      agentColor: "bg-blue-500/10 text-blue-400",
      msgs: 8,
      email: "ana.martinez@empresa.com",
      location: "Madrid, ES",
      status: "Nuevo"
   },
];

const ProspectsView = () => {
   const [selectedProspect, setSelectedProspect] = useState<any | null>(null);

   return (
      <div className="flex h-full relative overflow-hidden">
         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20 }}
            className={`flex-1 h-full bg-[#16202c] overflow-y-auto p-4 md:p-6 space-y-6 transition-all duration-300 ${selectedProspect ? 'w-1/2 opacity-50 pointer-events-none md:pointer-events-auto md:opacity-100' : 'w-full'}`}
         >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
               <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-white">Prospectos</h2>
                  <p className="text-xs text-gray-500">Gestiona y analiza los contactos captados por tus agentes</p>
               </motion.div>

               <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial md:w-64 group">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#27bea5]" />
                     <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="w-full bg-[#1c2938] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#27bea5] transition-colors"
                     />
                  </div>

                  <button className="flex items-center gap-2 px-3 py-2 bg-[#1c2938] border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                     <Filter size={14} />
                     <span>Filtrar</span>
                  </button>

                  <button className="flex items-center gap-2 px-3 py-2 bg-[#27bea5] rounded-lg text-xs font-bold text-white hover:bg-[#1fa992] transition-colors shadow-lg shadow-[#27bea5]/20">
                     <Download size={14} />
                     <span className="hidden sm:inline">Exportar CSV</span>
                  </button>
               </motion.div>
            </div>
            <motion.div variants={itemVariants} className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 pb-4 hidden md:grid">
               <div className="col-span-4">Nombre / Contacto</div>
               <div className="col-span-3">Última Interacción</div>
               <div className="col-span-2">Agente Asignado</div>
               <div className="col-span-2">Mensajes</div>
               <div className="col-span-1 text-right">Acciones</div>
            </motion.div>
            <div className="space-y-3">
               {prospectsData.map((prospect) => (
                  <motion.div
                     key={prospect.id}
                     variants={itemVariants}
                     layoutId={`row-${prospect.id}`}
                     onClick={() => setSelectedProspect(prospect)}
                     className={`group relative bg-[#1c2938] hover:bg-[#233346] border border-white/5 rounded-xl p-4 md:py-3 transition-all cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-4 items-center ${selectedProspect?.id === prospect.id ? 'border-[#27bea5] bg-[#233346]' : ''}`}
                  >
                     <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#27bea5]/10 flex items-center justify-center text-[#27bea5] shrink-0 border border-[#27bea5]/20 group-hover:scale-110 transition-transform">
                           <UserCircle size={20} />
                        </div>
                        <div className="min-w-0">
                           <h4 className="text-sm font-bold text-white truncate">{prospect.name}</h4>
                           <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Phone size={10} />
                              <span className="truncate">{prospect.contact}</span>
                           </div>
                        </div>
                     </div>
                     <div className="hidden md:block col-span-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                           <Calendar size={12} className="text-gray-500" />
                           {prospect.date}
                        </div>
                        <div className="text-[10px] text-gray-500 pl-5">{prospect.time}</div>
                     </div>
                     <div className="hidden md:block col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${prospect.agentColor}`}>
                           <span className="w-1.5 h-1.5 rounded-full bg-current" />
                           {prospect.agent}
                        </span>
                     </div>
                     <div className="hidden md:block col-span-2">
                        <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-white transition-colors">
                           <MessageSquare size={14} />
                           <span className="text-xs font-bold">{prospect.msgs}</span>
                        </div>
                     </div>
                     <div className="hidden md:block col-span-1 text-right">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                           <MoreHorizontal size={16} />
                        </button>
                     </div>
                     <div className="md:hidden flex justify-between items-center w-full border-t border-white/5 pt-3 mt-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${prospect.agentColor}`}>
                           {prospect.agent}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                           <span>{prospect.date}</span>
                           <span className="flex items-center gap-1"><MessageSquare size={12} /> {prospect.msgs}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
         <AnimatePresence>
            {selectedProspect && (
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute top-0 right-0 w-full md:w-[350px] h-full bg-[#1c2938] border-l border-white/10 shadow-2xl z-20 flex flex-col"
               >
                  <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#16202c]">
                     <h3 className="text-sm font-bold text-white">Perfil del Prospecto</h3>
                     <button
                        onClick={() => setSelectedProspect(null)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                     >
                        <X size={16} />
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5">
                     <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-[#27bea5]/10 flex items-center justify-center text-[#27bea5] mb-3 border-2 border-[#27bea5]/20">
                           <UserCircle size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-white">{selectedProspect.name}</h2>
                        <span className="text-xs text-[#27bea5] font-medium bg-[#27bea5]/10 px-2 py-0.5 rounded-full mt-2">
                           {selectedProspect.status}
                        </span>
                     </div>
                     <div className="flex gap-3 mb-8">
                        <button className="flex-1 flex flex-col items-center gap-1 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                           <MessageSquare size={18} className="text-[#27bea5]" />
                           <span className="text-[10px] text-gray-300">Chat</span>
                        </button>
                        <button className="flex-1 flex flex-col items-center gap-1 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                           <Phone size={18} className="text-blue-400" />
                           <span className="text-[10px] text-gray-300">Llamar</span>
                        </button>
                        <button className="flex-1 flex flex-col items-center gap-1 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                           <Mail size={18} className="text-purple-400" />
                           <span className="text-[10px] text-gray-300">Email</span>
                        </button>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Información de Contacto</h4>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                           <Phone size={16} className="text-gray-400" />
                           <div>
                              <p className="text-[10px] text-gray-500">Teléfono</p>
                              <p className="text-xs text-white font-medium">{selectedProspect.contact}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                           <Mail size={16} className="text-gray-400" />
                           <div>
                              <p className="text-[10px] text-gray-500">Correo Electrónico</p>
                              <p className="text-xs text-white font-medium">{selectedProspect.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                           <MapPin size={16} className="text-gray-400" />
                           <div>
                              <p className="text-[10px] text-gray-500">Ubicación</p>
                              <p className="text-xs text-white font-medium">{selectedProspect.location}</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 pt-6 border-t border-white/5">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Estadísticas</h4>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-[#16202c] p-3 rounded-xl text-center border border-white/5">
                              <div className="text-lg font-bold text-white">{selectedProspect.msgs}</div>
                              <div className="text-[9px] text-gray-500">Mensajes Totales</div>
                           </div>
                           <div className="bg-[#16202c] p-3 rounded-xl text-center border border-white/5">
                              <div className="text-lg font-bold text-white">98%</div>
                              <div className="text-[9px] text-gray-500">Tasa de Lectura</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-5 border-t border-white/5 bg-[#16202c]">
                     <Button className="w-full bg-[#27bea5] hover:bg-[#1fa992]">Ver Conversación Completa</Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const StatCard = ({ icon: Icon, value, label, trend }: any) => (
   <motion.div variants={itemVariants} className="bg-[#1c2938] border border-white/5 p-4 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="flex justify-between items-start mb-2">
         <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-white group-hover:bg-[#27bea5] transition-colors">
            <Icon size={18} />
         </div>
         <span className="text-[10px] font-bold text-[#27bea5] bg-[#27bea5]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Activity size={8} /> {trend}
         </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
   </motion.div>
);

const DashboardView = () => {
   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="show"
         exit={{ opacity: 0, x: -20 }}
         className="flex-1 h-full bg-[#16202c] overflow-y-auto p-4 md:p-6 space-y-6"
      >
         <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-white">Panel Principal</h2>
            <p className="text-xs text-gray-500">Información estratégica de tus agentes e interacciones</p>
         </motion.div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={MessageSquare} value="4" label="Conversaciones" trend="0%" />
            <StatCard icon={CreditCard} value="4,983" label="Créditos Disp." trend="0%" />
            <StatCard icon={Users} value="4" label="Nuevos Contactos" trend="0%" />
            <StatCard icon={Calendar} value="100%" label="Tasa Respuesta" trend="0%" />
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-2 bg-[#1c2938] border border-white/5 rounded-xl p-5 shadow-lg flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                  <div>
                     <h3 className="text-sm font-bold text-white">Conversaciones Iniciadas</h3>
                     <p className="text-[10px] text-gray-500">Total de conversaciones por día</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronLeft size={12} className="text-gray-400" /></button>
                     <span className="text-[10px] font-medium bg-white/5 px-3 py-1 rounded-full text-gray-300 whitespace-nowrap">29 dic - 4 ene</span>
                     <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight size={12} className="text-gray-400" /></button>
                  </div>
               </div>
               <div className="h-48 w-full relative pt-4 pb-6">
                  <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-gray-600 font-medium pb-6 pointer-events-none z-0 px-1">
                     <div className="border-b border-white/5 w-full h-px relative"><span className="absolute -top-3 right-0 text-white/10">2.0</span></div>
                     <div className="border-b border-white/5 w-full h-px relative"><span className="absolute -top-3 right-0 text-white/10">1.5</span></div>
                     <div className="border-b border-white/5 w-full h-px relative"><span className="absolute -top-3 right-0 text-white/10">1.0</span></div>
                     <div className="border-b border-white/5 w-full h-px relative"><span className="absolute -top-3 right-0 text-white/10">0.5</span></div>
                     <div className="border-b border-white/5 w-full h-px relative"><span className="absolute -top-3 right-0 text-white/10">0</span></div>
                  </div>
                  <svg className="w-full h-full absolute inset-0 z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#27bea5" stopOpacity="0.2" />
                           <stop offset="100%" stopColor="#27bea5" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                           <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                           <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                           </feMerge>
                        </filter>
                     </defs>
                     <path
                        d="M0,10 C 10,10 15,90 30,90 L 100,90"
                        fill="none"
                        stroke="#27bea5"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#glow)"
                     />
                     <path
                        d="M0,10 C 10,10 15,90 30,90 L 100,90 V 100 H 0 Z"
                        fill="url(#chartGradient)"
                        stroke="none"
                        opacity="0.6"
                     />
                     <circle cx="0" cy="10" r="1.5" fill="#27bea5" stroke="#1c2938" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-gray-500 font-medium px-1 pt-2">
                     <span>lun 29</span>
                     <span>mar 30</span>
                     <span>mié 31</span>
                     <span>jue 1</span>
                     <span>vie 2</span>
                     <span>sáb 3</span>
                     <span>dom 4</span>
                  </div>
               </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#1c2938] border border-white/5 rounded-xl p-5 shadow-lg flex flex-col h-full">
               <div className="flex items-center gap-2 mb-4 shrink-0">
                  <Activity size={14} className="text-gray-400" />
                  <h3 className="text-sm font-bold text-white">Canales</h3>
               </div>
               <div className="space-y-3 flex-1">
                  <div className="bg-[#16202c] rounded-lg p-3 flex items-center justify-between border border-white/5 gap-3">
                     <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#27bea5]/10 flex items-center justify-center text-[#27bea5] shrink-0">
                           <Globe size={16} />
                        </div>
                        <div className="min-w-0">
                           <p className="text-xs font-bold text-white truncate">Web Widget</p>
                           <p className="text-[9px] text-gray-500 truncate">Carla</p>
                        </div>
                     </div>
                     <span className="shrink-0 text-[9px] font-bold text-[#27bea5] bg-[#27bea5]/10 px-2 py-1 rounded-full flex items-center gap-1 border border-[#27bea5]/20">
                        Conectado
                     </span>
                  </div>
                  <div className="bg-[#16202c] rounded-lg p-3 flex items-center justify-between border border-white/5 gap-3">
                     <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#27bea5]/10 flex items-center justify-center text-[#27bea5] shrink-0">
                           <Globe size={16} />
                        </div>
                        <div className="min-w-0">
                           <p className="text-xs font-bold text-white truncate">Web Widget</p>
                           <p className="text-[9px] text-gray-500 truncate">Luis</p>
                        </div>
                     </div>
                     <span className="shrink-0 text-[9px] font-bold text-[#27bea5] bg-[#27bea5]/10 px-2 py-1 rounded-full flex items-center gap-1 border border-[#27bea5]/20">
                        Conectado
                     </span>
                  </div>
               </div>
            </motion.div>
         </div>
         <motion.div variants={itemVariants} className="pt-2">
            <h3 className="text-sm font-bold text-white mb-4">Top Desempeño por Agente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-[#1c2938] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-[#0d9488] flex items-center justify-center text-white font-bold text-lg relative">
                        C
                        <div className="absolute -bottom-1 -right-1 bg-white text-black text-[8px] font-bold px-1 rounded-full border border-[#1c2938]">#1</div>
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-white">Carla</h4>
                        <p className="text-[10px] text-gray-400">Agente de Ventas</p>
                     </div>
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-white">3 <span className="text-xs font-normal text-gray-500">conversaciones</span></div>
                     <div className="text-[10px] text-[#27bea5] font-medium mt-1 flex items-center gap-1"><Activity size={10} /> 17 créditos usados</div>
                  </div>
                  <div className="pt-3 border-t border-white/5 space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-blue-500/10 rounded text-blue-400"><Clock size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Horas activas</p>
                           <p className="text-xs font-bold text-white">6h esta semana</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-purple-500/10 rounded text-purple-400"><Activity size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Pico de actividad</p>
                           <p className="text-xs font-bold text-white">Domingo • 17:00-18:00</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-green-500/10 rounded text-green-400"><Smartphone size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Canales principales</p>
                           <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-300">Web <span className="text-[#27bea5]">100%</span></span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-[#1c2938] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-[#27bea5] flex items-center justify-center text-white font-bold text-lg relative">
                        L
                        <div className="absolute -bottom-1 -right-1 bg-white text-black text-[8px] font-bold px-1 rounded-full border border-[#1c2938]">#2</div>
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-white">Luis</h4>
                        <p className="text-[10px] text-gray-400">Agente de Ventas</p>
                     </div>
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-white">1 <span className="text-xs font-normal text-gray-500">conversaciones</span></div>
                  </div>
                  <div className="pt-3 border-t border-white/5 space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-blue-500/10 rounded text-blue-400"><Clock size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Horas activas</p>
                           <p className="text-xs font-bold text-white">1h esta semana</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-purple-500/10 rounded text-purple-400"><Activity size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Pico de actividad</p>
                           <p className="text-xs font-bold text-white">Lunes • 10:00-11:00</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-green-500/10 rounded text-green-400"><Smartphone size={12} /></div>
                        <div>
                           <p className="text-[9px] text-gray-500">Canales principales</p>
                           <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-300">Web <span className="text-[#27bea5]">100%</span></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

interface MenuItemProps {
   icon: React.ReactNode;
   label: string;
   active?: boolean;
   onClick?: () => void;
   index?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, active, onClick, index = 0 }) => (
   <li
      onClick={onClick}
      className={`relative flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer group ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
         }`}
   >
      <motion.div
         className="absolute inset-0 rounded-xl border border-[#27bea5] shadow-[0_0_12px_rgba(39,190,165,0.4)] pointer-events-none"
         initial={{ opacity: 0 }}
         animate={{ opacity: [0, 1, 0] }}
         transition={{
            duration: 1.5,
            times: [0, 0.5, 1],
            delay: 1 + (index * 1.5),
            repeat: Infinity,
            repeatDelay: (6 * 1.5) - 1.5
         }}
      />
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 relative z-10 ${active ? 'bg-[#27bea5] text-white shadow-lg shadow-[#27bea5]/20' : 'bg-[#1c2938] border border-white/10'
         }`}>
         {React.cloneElement(icon as React.ReactElement, { size: 14 })}
      </div>
      <span className="text-sm font-medium relative z-10">{label}</span>
   </li>
);

const Hero: React.FC = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isTyping, setIsTyping] = useState<'user' | 'bot' | null>(null);
   const [activeTab, setActiveTab] = useState<'dashboard' | 'chats' | 'prospects' | 'agents' | 'team' | 'channels'>('chats');
   const scrollRef = useRef<HTMLDivElement>(null);

   const navSections = [
      {
         title: 'General',
         items: [
            { id: 'dashboard', icon: <LayoutGrid size={18} />, label: 'Paneles' }
         ]
      },
      {
         title: 'Comunicación',
         items: [
            { id: 'chats', icon: <MessageSquare size={18} />, label: 'Chats' },
            { id: 'prospects', icon: <UserCircle size={18} />, label: 'Prospectos' },
            { id: 'agents', icon: <Bot size={18} />, label: 'Agentes' }
         ]
      },
      {
         title: 'Ajustes',
         items: [
            { id: 'team', icon: <Users size={18} />, label: 'Equipo' },
            { id: 'channels', icon: <Radio size={18} />, label: 'Canales' }
         ]
      }
   ];

   useEffect(() => {
      if (activeTab === 'chats' && scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages, isTyping, activeTab]);

   useEffect(() => {
      let isCancelled = false;
      const sequence = [
         { type: 'wait', duration: 1000 },
         { type: 'typing', role: 'user', duration: 1500 },
         { type: 'message', role: 'user', text: "Hola, quiero información sobre sus servicios. 🚀" },
         { type: 'wait', duration: 1000 },
         { type: 'typing', role: 'bot', duration: 2000 },
         { type: 'message', role: 'bot', text: "¡Hola! Bienvenido a Konsul. 👋 Centralizamos tus chats de WhatsApp, Instagram y Web en un solo lugar." },
         { type: 'wait', duration: 1000 },
         { type: 'typing', role: 'bot', duration: 1500 },
         { type: 'message', role: 'bot', text: "¿Te gustaría agendar una demo o ver nuestros planes?" },
         { type: 'wait', duration: 1000 },
         { type: 'typing', role: 'user', duration: 1500 },
         { type: 'message', role: 'user', text: "Agendar una demo, por favor." },
         { type: 'wait', duration: 5000 },
         { type: 'reset' }
      ];

      const runSequence = async () => {
         for (const step of sequence) {
            if (isCancelled) break;
            if (step.type === 'wait') await new Promise(r => setTimeout(r, step.duration));
            else if (step.type === 'typing') { setIsTyping(step.role as 'user' | 'bot'); await new Promise(r => setTimeout(r, step.duration)); }
            else if (step.type === 'message') { setIsTyping(null); setMessages(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), role: step.role as 'user' | 'bot', text: step.text! }]); }
            else if (step.type === 'reset') { setIsTyping(null); setMessages([]); runSequence(); return; }
         }
      };

      runSequence();
      return () => { isCancelled = true; };
   }, []);

   return (
      <section id="hero" className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-konsul-950">
         <div className="absolute top-0 left-0 w-full h-[100vh] max-h-[1200px] overflow-hidden z-0 pointer-events-none">
            <img
               src="https://konsul.digital/wp-content/uploads/2025/12/Gemini_Generated_Image_x41m0wx41m0wx41m-scaled.avif"
               alt="Konsul Background"
               width="2560"
               height="1440"
               // Use fetchPriority="high" (camelCase for React)
               fetchPriority="high"
               className="w-full h-full object-cover object-top opacity-100 mt-24 md:mt-0"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,41,56,0.95)_0%,transparent_60%)]" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1c2938] via-[#1c2938]/80 to-transparent backdrop-blur-[2px] md:backdrop-blur-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] md:h-[40vh] bg-gradient-to-t from-[#1c2938] via-[#1c2938]/90 to-transparent backdrop-blur-[2px] md:backdrop-blur-none" />
         </div>

         <div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-[#27bea5]/20 rounded-full blur-[80px] md:blur-[120px] -z-10" />

         <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mt-[10vh] md:mt-0"
               >
                  Convierte conversaciones <br />
                  <span className="text-white">en clientes leales.</span>
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-gray-200 font-normal mb-8 md:mb-10 max-w-3xl leading-relaxed px-4 md:px-0 mt-0 md:mt-0"
               >
                  Centraliza WhatsApp, Instagram y Messenger en una sola bandeja. Automatiza tus ventas y atención al cliente con Agentes de IA que atienden, aprenden y convierten.
               </motion.p>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0 mb-8"
               >
                  <a href="https://calendly.com/wearekonsul/konsul-ecosistema-ia" target="_blank">
                     <Button size="lg" icon={<ArrowRight size={18} />} className="w-full sm:w-auto">
                        Agenda una llamada
                     </Button>
                  </a>
                  <a href="https://konsul.digital/chatbot-demo" target="_blank">
                     <Button variant="outline" size="lg" icon={<MessageSquare size={18} />} className="w-full sm:w-auto">
                        Probar DEMO
                     </Button>
                  </a>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-konsul-300 backdrop-blur-sm"
               >
                  <span className="w-2 h-2 rounded-full bg-konsul-500 animate-pulse" />
                  La plataforma #1 de Comercio Conversacional
               </motion.div>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mt-12 md:mt-16 pt-8 border-t border-white/5 w-full"
               >
                  <p className="text-xs md:text-sm text-gray-500 mb-6 font-normal">Potenciando a las empresas líderes en Latinoamérica</p>
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-100 px-4">
                     {[
                        { name: 'Rappi', src: 'https://placehold.co/120x40/1c2938/ffffff?text=Rappi' },
                        { name: 'Toyota', src: 'https://placehold.co/120x40/1c2938/ffffff?text=Toyota' },
                        { name: 'Remax', src: 'https://placehold.co/120x40/1c2938/ffffff?text=Remax' },
                        { name: 'Anahuac', src: 'https://placehold.co/120x40/1c2938/ffffff?text=Anahuac' }
                     ].map((logo) => (
                        <img
                           key={logo.name}
                           src={logo.src}
                           alt={`${logo.name} logo`}
                           width="120"
                           height="40"
                           loading="lazy"
                           className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                        />
                     ))}
                  </div>
               </motion.div>
            </div>

            <motion.div
               id="chatbot-demo"
               initial={{ opacity: 0, y: 100, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="mt-12 md:mt-20 w-full max-w-[95%] md:max-w-5xl mx-auto relative"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#27bea5]/30 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen" />

               <div className="relative rounded-2xl md:rounded-2xl bg-[#1c2938] border border-white/10 p-1 md:p-2 shadow-2xl shadow-konsul-500/10 overflow-hidden group">

                  <div className="aspect-[9/16] sm:aspect-[4/3] md:aspect-[21/9] lg:aspect-[16/9] h-[600px] sm:h-[500px] md:h-auto rounded-xl bg-[#16202c] overflow-hidden relative flex flex-col md:flex-row">

                     <div className="w-64 border-r border-white/5 bg-[#1c2938] hidden md:flex flex-col flex-shrink-0">
                        <div className="p-4">
                           <div className="bg-[#16202c] rounded-xl p-3 flex items-center justify-between mb-4 border border-white/5 shadow-lg">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-[#27bea5] rounded-lg flex items-center justify-center">
                                    <LayoutGrid size={16} className="text-white" />
                                 </div>
                                 <span className="font-bold text-white text-sm">Kônsul</span>
                              </div>
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                           </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 space-y-6">
                           {(() => {
                              let globalItemIndex = 0;
                              return navSections.map((section) => (
                                 <div key={section.title}>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">{section.title}</h4>
                                    <ul className="space-y-1">
                                       {section.items.map((item) => (
                                          <MenuItem
                                             key={item.id}
                                             icon={item.icon}
                                             label={item.label}
                                             active={activeTab === item.id}
                                             onClick={() => setActiveTab(item.id as any)}
                                             index={globalItemIndex++}
                                          />
                                       ))}
                                    </ul>
                                 </div>
                              ));
                           })()}
                        </div>
                     </div>

                     <div className="flex-1 flex flex-col h-full bg-[#16202c] relative overflow-hidden">
                        <div className="md:hidden border-b border-white/5 bg-[#1c2938] shrink-0 p-2">
                           <div className="grid grid-cols-3 gap-2">
                              {navSections.flatMap(s => s.items).map((item, index) => (
                                 <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className="relative p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors group"
                                 >
                                    <motion.div
                                       className="absolute inset-0 rounded-lg border border-[#27bea5] shadow-[0_0_8px_rgba(39,190,165,0.4)] pointer-events-none"
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: [0, 1, 0] }}
                                       transition={{
                                          duration: 1.5,
                                          times: [0, 0.5, 1],
                                          delay: 1 + (index * 1.5),
                                          repeat: Infinity,
                                          repeatDelay: (6 * 1.5) - 1.5
                                       }}
                                    />
                                    {activeTab === item.id && (
                                       <motion.div
                                          layoutId="mobile-tab-bg"
                                          className="absolute inset-0 bg-white/10 rounded-lg"
                                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                       />
                                    )}
                                    <span className={`relative z-10 flex items-center ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>
                                       {React.cloneElement(item.icon as React.ReactElement, { size: 14 })}
                                    </span>
                                    <span className={`relative z-10 text-[9px] font-bold ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>
                                       {item.label}
                                    </span>
                                 </button>
                              ))}
                           </div>
                        </div>

                        <AnimatePresence mode="wait">
                           {activeTab === 'chats' && (
                              <motion.div
                                 key="chats"
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 20 }}
                                 transition={{ duration: 0.3 }}
                                 className="flex flex-col h-full w-full"
                              >
                                 <div className="h-16 border-b border-white/5 bg-[#1c2938] flex items-center px-4 gap-3 z-10 shrink-0">
                                    <div className="relative shrink-0">
                                       <img
                                          src="https://konsul.digital/wp-content/uploads/2025/07/cropped-3.png"
                                          alt="Bot Avatar"
                                          width="40"
                                          height="40"
                                          className="w-10 h-10 rounded-full object-cover bg-white p-1"
                                       />
                                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1c2938] rounded-full"></div>
                                    </div>
                                    <div className="min-w-0">
                                       <h3 className="font-bold text-white text-sm truncate">Konsul AI Agent</h3>
                                       <p className="text-xs text-konsul-400 font-normal truncate">Responde instantáneamente</p>
                                    </div>
                                 </div>

                                 <div
                                    ref={scrollRef}
                                    className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 scroll-smooth"
                                 >
                                    <AnimatePresence mode="popLayout">
                                       {messages.map((msg) => (
                                          <motion.div
                                             key={msg.id}
                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                             animate={{ opacity: 1, y: 0, scale: 1 }}
                                             exit={{ opacity: 0, scale: 0.9 }}
                                             className={`flex gap-3 md:gap-4 ${msg.role === 'bot' ? 'flex-row-reverse' : ''}`}
                                          >
                                             <div className="flex-shrink-0">
                                                {msg.role === 'user' ? (
                                                   <img
                                                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                                                      alt="User"
                                                      width="40"
                                                      height="40"
                                                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/10"
                                                   />
                                                ) : (
                                                   <img
                                                      src="https://konsul.digital/wp-content/uploads/2025/07/cropped-3.png"
                                                      alt="Bot"
                                                      width="40"
                                                      height="40"
                                                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover bg-white p-1 border-2 border-white/10"
                                                   />
                                                )}
                                             </div>
                                             <div
                                                className={`p-3 md:p-4 rounded-2xl text-xs md:text-sm max-w-[85%] md:max-w-[80%] leading-relaxed shadow-lg font-normal ${msg.role === 'user'
                                                   ? 'bg-[#233346] text-gray-200 rounded-tl-none'
                                                   : 'bg-[#27bea5] text-white rounded-tr-none'
                                                   }`}
                                             >
                                                {msg.text}
                                             </div>
                                          </motion.div>
                                       ))}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                       {isTyping && (
                                          <motion.div
                                             initial={{ opacity: 0, y: 10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: 10 }}
                                             className={`flex gap-3 md:gap-4 ${isTyping === 'bot' ? 'flex-row-reverse' : ''}`}
                                          >
                                             <div className="flex-shrink-0">
                                                {isTyping === 'user' ? (
                                                   <img
                                                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                                                      alt="User"
                                                      width="40"
                                                      height="40"
                                                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/10 opacity-70"
                                                   />
                                                ) : (
                                                   <img
                                                      src="https://konsul.digital/wp-content/uploads/2025/07/cropped-3.png"
                                                      alt="Bot"
                                                      width="40"
                                                      height="40"
                                                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover bg-white p-1 border-2 border-white/10 opacity-70"
                                                   />
                                                )}
                                             </div>
                                             <div className={`p-4 rounded-2xl flex items-center gap-1 h-[48px] md:h-[52px] ${isTyping === 'user'
                                                ? 'bg-[#233346]/50 rounded-tl-none'
                                                : 'bg-[#27bea5]/50 rounded-tr-none'
                                                }`}>
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 rounded-full animate-bounce"></span>
                                             </div>
                                          </motion.div>
                                       )}
                                    </AnimatePresence>
                                 </div>

                                 <div className="p-3 md:p-4 border-t border-white/5 bg-[#1c2938] shrink-0">
                                    <div className="w-full h-10 md:h-12 bg-[#15202b] rounded-xl border border-white/5 flex items-center px-4 justify-between">
                                       <div className="h-1.5 md:h-2 w-1/3 bg-gray-700/50 rounded" />
                                       <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#27bea5]/20 flex items-center justify-center">
                                          <ArrowRight size={14} className="text-[#27bea5]" />
                                       </div>
                                    </div>
                                 </div>
                              </motion.div>
                           )}

                           {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
                           {activeTab === 'prospects' && <ProspectsView key="prospects" />}
                           {activeTab === 'agents' && <AgentsView key="agents" />}
                           {activeTab === 'team' && <TeamView key="team" />}
                           {activeTab === 'channels' && <ChannelsView key="channels" />}

                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default Hero;
