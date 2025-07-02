
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Esencial",
    description: "Para el control total de una planta o centro de datos.",
    monthlyPrice: 299,
    annualPrice: 2500,
    cta: "Empezar Ahora",
    isHighlighted: false,
    features: [
      "Hasta 10 Racks",
      "Hasta 150 Activos",
      "Hasta 1,000 Nodos",
      "30 Consultas de IA / mes",
      "Copias de Seguridad Semanales",
      "Soporte por Email",
    ],
  },
  {
    name: "Crecimiento",
    description: "Para optimizar operaciones y equipos en expansión.",
    monthlyPrice: 599,
    annualPrice: 6000,
    cta: "Elegir Plan Crecimiento",
    isHighlighted: true,
    features: [
      "Todo lo del plan Esencial, además de:",
      "Límites Ampliados (25 Racks, 500 Activos, 4,000 Nodos)",
      "100 Consultas de IA / mes",
      "Copias de Seguridad Diarias",
      "Roles y Permisos Avanzados",
      "Módulo para Proveedores (Próximamente)",
    ],
  },
  {
    name: "Corporativo",
    description: "Para el control maestro multi-planta y a gran escala.",
    monthlyPrice: null,
    annualPrice: null,
    cta: "Contactar a Ventas",
    isHighlighted: false,
    features: [
      "Gestión Centralizada Multi-Planta",
      "Límites y Consultas IA Ilimitados",
      "Acceso Completo a la API",
      "Soporte Premium con SLA",
      "Onboarding y Capacitación Personalizada",
    ],
  },
];

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <section id="precios" className="py-20 lg:py-32 overflow-hidden relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] w-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)] -z-0"></div>
            <div className="container mx-auto px-4 relative">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold">Un Plan para Cada Misión.</h2>
                    <p className="font-sans text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Comienza con el control que necesitas hoy y escala sin límites mañana. Todos los planes te dan acceso a la plataforma completa de Zionary.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={cn("font-medium transition-colors", !isAnnual ? "text-primary" : "text-muted-foreground")}>Facturación Mensual</span>
                        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Cambiar a facturación anual" />
                        <span className={cn("font-medium transition-colors", isAnnual ? "text-primary" : "text-muted-foreground")}>Facturación Anual (ahorra 20%)</span>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {plans.map((plan) => (
                        <motion.div key={plan.name} variants={cardVariants} className="h-full">
                            <Card className={cn(
                                "flex flex-col h-full transition-all duration-300 rounded-2xl",
                                plan.isHighlighted
                                    ? "bg-gradient-to-br from-[#1A1033] to-[#0A192F] border-2 border-primary/50 shadow-[0_0_25px_hsl(var(--primary)/0.5)]"
                                    : "bg-white/5 border border-white/10 backdrop-blur-md hover:border-primary/70",
                                "hover:-translate-y-2"
                            )}>
                                {plan.isHighlighted && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-bold py-1 px-3">MÁS POPULAR</Badge>
                                )}
                                <CardHeader className="pt-10">
                                    <CardTitle className="font-sans text-2xl font-bold text-center">{plan.name}</CardTitle>
                                    <CardDescription className="text-center pt-2 min-h-[40px]">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-between">
                                    <div className="text-center my-6">
                                        {plan.monthlyPrice !== null ? (
                                            <>
                                                <div className="flex justify-center items-end">
                                                    <span className="font-sans text-5xl font-bold">${isAnnual ? plan.annualPrice?.toLocaleString() : plan.monthlyPrice.toLocaleString()}</span>
                                                </div>
                                                <p className="text-muted-foreground">{isAnnual ? '/año' : '/mes'}</p>
                                            </>
                                        ) : (
                                            <span className="font-sans text-4xl font-bold">Personalizado</span>
                                        )}
                                    </div>
                                    <ul className="space-y-4 text-sm">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className={cn(
                                                    "text-muted-foreground", 
                                                    (feature.startsWith("Todo") || feature.startsWith("Módulo") || feature.startsWith("Gestión")) && "text-foreground font-semibold"
                                                )}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="p-6">
                                    <Button className={cn(
                                        "w-full font-bold text-lg h-12 transition-all duration-300 hover:scale-105",
                                        plan.isHighlighted 
                                            ? "bg-gradient-to-r from-[#8A78FF] to-[#7B61FF] text-primary-foreground shadow-lg hover:shadow-primary/40" 
                                            : "bg-primary/20 hover:bg-primary/30 text-primary-foreground"
                                    )}>
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
