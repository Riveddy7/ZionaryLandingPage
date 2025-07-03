
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Server, BarChart, Rocket, Sparkle, Map, Zap, ListChecks, Cable, Box
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StoryCarousel } from './story-carousel';

const featuresData = {
    ControlTotal: {
        title: '( Control Total )',
        description: 'Haz clic en una característica para explorar cómo Zionary te devuelve el poder sobre tu infraestructura.',
        icon: null,
    },
    VisualizadorRacks: {
        id: 'VisualizadorRacks',
        title: 'Visualizador de Racks',
        description: 'Arrastra y suelta activos en racks fotorrealistas. Gestiona la capacidad, el peso y la energía con una interfaz que se siente como un videojuego, no como software de contabilidad.',
        icon: <Server className="w-8 h-8" />,
        position: 'col-span-2',
    },
    ReportesAutomatizados: {
        id: 'ReportesAutomatizados',
        title: 'Reportes Automatizados',
        description: 'Genera informes de inventario, capacidad y auditoría con un solo clic. Deja de perder horas en Excel y presenta datos profesionales.',
        icon: <BarChart className="w-8 h-8" />,
        position: 'col-start-3',
    },
    ROIRapido: {
        id: 'ROIRapido',
        title: 'ROI Rápido',
        description: 'Cada hora que ahorras y cada error que evitas se traduce en dinero. Zionary está diseñado para pagarse solo en los primeros meses de uso.',
        icon: <Rocket className="w-8 h-8" />,
        position: 'col-start-4',
    },
    AsistidoIA: {
        id: 'AsistidoIA',
        title: 'Asistido por IA',
        description: 'Nuestro asistente analiza tu infraestructura para darte recomendaciones inteligentes, desde dónde colocar un servidor hasta cómo optimizar el consumo energético.',
        icon: <Sparkle className="w-8 h-8" />,
        position: 'row-start-2',
    },
    PlanosDePlanta: {
        id: 'PlanosDePlanta',
        title: 'Planos de Planta',
        description: 'Sube el plano de tu centro de datos y coloca tus racks sobre él. Obtén una visión de águila de tu distribución física y planifica el crecimiento de forma inteligente.',
        icon: <Map className="w-8 h-8" />,
        position: 'col-start-4 row-start-2 row-span-2',
    },
    PlataformaModerna: {
        id: 'PlataformaModerna',
        title: 'Plataforma Moderna',
        description: 'Construido con tecnología de punta (Next.js, Supabase) para una experiencia de usuario rápida, segura y confiable en cualquier dispositivo.',
        icon: <Zap className="w-8 h-8" />,
        position: 'col-start-1 row-start-3',
    },
    ClaridadYOrden: {
        id: 'ClaridadYOrden',
        title: 'Claridad y Orden',
        description: 'Reemplaza el caos de notas y diagramas con un sistema centralizado que trae paz mental y control total a tu equipo de operaciones.',
        icon: <ListChecks className="w-8 h-8" />,
        position: 'row-start-4',
    },
    GestionConectividad: {
        id: 'GestionConectividad',
        title: 'Gestión de Conectividad',
        description: 'Documenta y visualiza cada cable. Traza conexiones completas con un solo clic, desde el servidor hasta el switch, para resolver problemas en segundos, no en horas.',
        icon: <Cable className="w-8 h-8" />,
        position: 'col-start-2 col-span-2 row-start-4',
    },
    InventarioPreciso: {
        id: 'InventarioPreciso',
        title: 'Inventario Preciso',
        description: 'Ten un registro exacto de cada activo, su ubicación y su estado. La base para una gestión sin errores.',
        icon: <Box className="w-8 h-8" />,
        position: 'col-start-4 row-start-4',
    }
};

const peripheralFeatures = Object.values(featuresData).filter(f => f.id);

const CentralPanel = ({ title, description, activeFeatureId }: { title: string, description: string, activeFeatureId: string }) => {
    const isActivated = activeFeatureId !== 'ControlTotal';
    return (
        <div className={cn(
            "glass-card col-start-2 col-span-2 row-start-2 row-span-2 rounded-2xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300",
            isActivated 
                ? "bg-gradient-to-br from-primary/20 to-primary/5 border-primary shadow-[0_0_25px_hsl(var(--primary)/0.5)]"
                : "border-primary/30"
        )}>
             <AnimatePresence mode="wait">
                <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex flex-col items-center justify-center"
                >
                    <h3 className="font-bold text-3xl font-sans bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">{title}</h3>
                    <p className="text-muted-foreground max-w-md">{description}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const FeatureCard = ({ feature, isActive, onClick }: { feature: typeof featuresData[keyof typeof featuresData], isActive: boolean, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        className={cn(
            'glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary/80',
            isActive ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]' : 'border-white/10 hover:border-white/30',
            feature.position
        )}
        whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
    >
        <div className={cn(
            "mb-3 transition-colors duration-300",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
        )}>
            {feature.icon}
        </div>
        <h4 className={cn(
            "font-bold text-sm font-sans transition-colors duration-300",
            isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
        )}>{feature.title}</h4>
    </motion.button>
);

export function FeaturesMosaic() {
    const [activeFeature, setActiveFeature] = useState('ControlTotal');

    const activeData = featuresData[activeFeature as keyof typeof featuresData];

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
                        Desde la visualización de racks hasta la optimización con IA, Zionary es la plataforma todo en uno que elimina el caos y te devuelve el control.
                    </p>
                </motion.div>
                
                <div className="hidden lg:grid grid-cols-4 grid-rows-4 gap-4 aspect-[16/9] max-w-6xl mx-auto">
                    <CentralPanel title={activeData.title} description={activeData.description} activeFeatureId={activeFeature} />
                    
                    {peripheralFeatures.map((feature) => (
                         <FeatureCard
                            key={feature.id}
                            feature={feature}
                            isActive={activeFeature === feature.id}
                            onClick={() => setActiveFeature(feature.id!)}
                        />
                    ))}
                </div>

                <div className="block lg:hidden -mx-4">
                    <StoryCarousel />
                </div>
            </div>
        </section>
    );
}
