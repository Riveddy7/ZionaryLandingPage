
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Server, Cable, Map, Sparkle, Zap, ListChecks, 
    BarChart, Rocket, Box, Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ModalData = {
    title: string;
    description: string;
    gifUrl: string;
    aiHint: string;
} | null;

const jewelCards = [
    { 
        id: 'racks',
        position: 'col-span-2',
        icon: <Server className="w-8 h-8" />,
        title: "Visualizador de Racks",
        modal: {
            title: "Visualizador de Racks Interactivo",
            description: "Arrastra y suelta activos en racks fotorrealistas. Gestiona la capacidad, el peso y la energía en tiempo real con una interfaz que se siente como un videojuego, no como un software de contabilidad.",
            gifUrl: "https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/landing-images/Pasted%20Graphic.webp",
            aiHint: "rack visualization"
        }
    },
    { 
        id: 'connectivity',
        position: 'col-start-3 col-span-2',
        icon: <Cable className="w-8 h-8" />,
        title: "Gestión de Conectividad",
        modal: {
            title: "Conectividad de Puerto a Puerto",
            description: "Documenta y visualiza cada cable. Traza conexiones completas con un solo clic, desde el servidor hasta el switch, para resolver problemas en segundos, no en horas.",
            gifUrl: "https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/landing-images//Pasted%20Graphic%201.webp",
            aiHint: "network connections"
        }
    },
    { 
        id: 'floor-plans',
        position: 'col-start-4 row-span-2',
        icon: <Map className="w-8 h-8" />,
        title: "Planos de Planta",
        modal: {
            title: "Planos de Planta Vivos",
            description: "Sube el plano de tu centro de datos y coloca tus racks sobre él. Obtén una visión de águila de tu distribución física y planifica el crecimiento de forma inteligente.",
            gifUrl: "https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/landing-images//Pasted%20Graphic%202.webp",
            aiHint: "data center map"
        }
    },
];

const flipCardsData = [
    {
        position: "col-start-1 row-start-2",
        icon: <Sparkle className="w-8 h-8 text-cyan-400" />,
        title: "Asistido por IA",
        back: "Nuestro asistente analiza tu infraestructura para darte recomendaciones inteligentes, desde dónde colocar un servidor hasta cómo optimizar el consumo energético."
    },
    {
        position: "col-start-1 row-start-3",
        icon: <Zap className="w-8 h-8 text-cyan-400" />,
        title: "Plataforma Moderna",
        back: "Construido con tecnología de punta (Next.js, Supabase) para una experiencia de usuario rápida, segura y confiable en cualquier dispositivo."
    },
    {
        position: "col-start-1 row-start-4",
        icon: <ListChecks className="w-8 h-8 text-cyan-400" />,
        title: "Claridad y Orden",
        back: "Reemplaza el caos de notas y diagramas con un sistema centralizado que trae paz mental y control total a tu equipo de operaciones."
    },
    {
        position: "col-start-2 row-start-4",
        icon: <BarChart className="w-8 h-8 text-cyan-400" />,
        title: "Reportes Automatizados",
        back: "Genera informes de inventario, capacidad y auditoría con un solo clic. Deja de perder horas en Excel y presenta datos profesionales."
    },
    {
        position: "col-start-3 row-start-4",
        icon: <Rocket className="w-8 h-8 text-cyan-400" />,
        title: "ROI Rápido",
        back: "Cada hora que ahorras y cada error que evitas se traduce en dinero. Nexus está diseñado para pagarse solo en los primeros meses de uso."
    },
    {
        position: "col-start-4 row-start-4",
        icon: <Box className="w-8 h-8 text-cyan-400" />,
        title: "Inventario Preciso",
        back: "Ten un registro exacto de cada activo, su ubicación y su estado. La base para una gestión sin errores."
    }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    },
};

const Modal = ({ isOpen, onClose, title, description, gifUrl, aiHint }: { isOpen: boolean, onClose: () => void, title: string, description: string, gifUrl: string, aiHint: string }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative glass-card rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-primary/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 flex-shrink-0">
                             <h3 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 font-sans">{title}</h3>
                             <p className="text-muted-foreground mt-2">{description}</p>
                        </div>
                        <div className="flex-grow bg-black/30 p-4">
                            <Image src={gifUrl} alt={title} width={1200} height={800} className="w-full h-full object-contain rounded-lg" data-ai-hint={aiHint}/>
                        </div>

                        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const FlipCard = ({ icon, title, back, position }: { icon: React.ReactNode, title: string, back: string, position: string }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div 
            variants={cardVariants}
            className={cn("w-full h-full [perspective:1000px] group", position)} 
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div 
                className={cn("relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer")}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Front */}
                <div className="absolute inset-0 bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] group-hover:border-cyan-400/50 transition-colors duration-300">
                    <div className="mb-4">{icon}</div>
                    <h4 className="font-bold text-lg font-sans text-white">{title}</h4>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-black/40 border border-white/10 rounded-xl p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-muted-foreground font-sans">{back}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const JewelCard = ({ icon, title, onClick, position }: { icon: React.ReactNode, title: string, onClick: () => void, position: string }) => (
    <motion.div 
        variants={cardVariants}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={cn("w-full h-full bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/70 transition-colors duration-300", position)} 
        onClick={onClick}
    >
        <div className="text-primary mb-4">{icon}</div>
        <h4 className="font-bold text-lg font-sans text-white">{title}</h4>
    </motion.div>
);

const HeroCard = () => (
    <motion.div 
        variants={cardVariants}
        className="col-start-2 col-span-2 row-start-2 row-span-2 w-full h-full border border-primary/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background"
    >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <h3 className="font-bold text-6xl font-sans text-primary tracking-wider z-10"> ( Control Total ) </h3>
    </motion.div>
);


export function FeaturesMosaic() {
    const [modalContent, setModalContent] = useState<ModalData>(null);

    const openModal = (data: ModalData) => {
        setModalContent(data);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <section className="py-20 lg:py-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="font-bold text-5xl lg:text-6xl text-white font-sans">Un Sistema Operativo para tu Infraestructura</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto font-sans">
                        Desde la visualización de racks hasta la optimización con IA, Nexus es la plataforma todo en uno que elimina el caos y te devuelve el control.
                    </p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-4 grid-rows-4 gap-4 aspect-[16/9] max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <HeroCard />

                    {jewelCards.map(card => (
                        <JewelCard 
                            key={card.id}
                            position={card.position}
                            icon={card.icon}
                            title={card.title}
                            onClick={() => openModal(card.modal)}
                        />
                    ))}

                    {flipCardsData.map((card, index) => (
                        <FlipCard 
                            key={index}
                            position={card.position}
                            icon={card.icon}
                            title={card.title}
                            back={card.back}
                        />
                    ))}
                </motion.div>
            </div>
            
            <AnimatePresence>
                {modalContent && (
                    <Modal 
                        isOpen={!!modalContent}
                        onClose={closeModal}
                        {...modalContent}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
