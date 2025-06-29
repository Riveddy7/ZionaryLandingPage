"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Linkedin } from "lucide-react";
import { Sparkle, Cube, Database } from "@phosphor-icons/react";
import Image from "next/image";

const useScrollObserver = (options: IntersectionObserverInit) => {
    const [elements, setElements] = useState<HTMLElement[]>([]);
    const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

    useEffect(() => {
        if (!elements.length) return;
        const observer = new IntersectionObserver((entries) => {
            setEntries(entries);
        }, options);

        elements.forEach(element => observer.observe(element));

        return () => {
            elements.forEach(element => observer.unobserve(element));
        };
    }, [elements, options]);

    return [setElements, entries] as const;
};

export default function HomePage() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="bg-background text-foreground font-body antialiased">
            <Navbar onLinkClick={{
                features: () => scrollTo(featuresRef),
                pricing: () => scrollTo(pricingRef),
                testimonials: () => scrollTo(testimonialsRef),
            }} />
            <main>
                <HeroSection onDiscoverClick={() => scrollTo(featuresRef)} />
                <TrustBar />
                <div ref={featuresRef}>
                    <FeaturesSection />
                </div>
                <div ref={pricingRef}>
                    <PricingSection />
                </div>
                <div ref={testimonialsRef}>
                    <TestimonialSection />
                </div>
                <LeadCaptureSection />
            </main>
            <Footer />
        </div>
    );
}

interface NavLinkProps {
    features: () => void;
    pricing: () => void;
    testimonials: () => void;
}

const Navbar = ({ onLinkClick }: { onLinkClick: NavLinkProps }) => (
    <header className="sticky top-0 z-50 w-full nav-glass border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <Sparkle className="h-7 w-7 text-primary" weight="fill" />
                <span className="font-headline text-2xl font-bold text-foreground">Nexus</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <button onClick={onLinkClick.features} className="text-muted-foreground transition-colors hover:text-primary">Características</button>
                <button onClick={onLinkClick.pricing} className="text-muted-foreground transition-colors hover:text-primary">Precios</button>
                <button onClick={onLinkClick.testimonials} className="text-muted-foreground transition-colors hover:text-primary">Testimonios</button>
            </nav>
            <Button className="font-bold bg-primary/90 hover:bg-primary text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                Obtener Acceso
            </Button>
        </div>
    </header>
);

const HeroSection = ({ onDiscoverClick }: { onDiscoverClick: () => void }) => (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden hero-bg">
        <div className="container mx-auto px-4 z-10">
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
                Infraestructura compleja, gestión simple.
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground mt-8 max-w-3xl mx-auto">
                El centro de mando visual e inteligente que tu data center merece.
            </p>
            <div className="mt-12">
                <Button onClick={onDiscoverClick} size="lg" className="font-bold text-lg bg-primary/90 hover:bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 h-14 px-10">
                    Descubre el Poder de Nexus
                </Button>
            </div>
        </div>
    </section>
);

const TrustBar = () => {
    const logos = ["TechCorp", "Industrias de México", "Logística Global", "Bajanet", "Syscom"];
    return (
        <div className="py-12 bg-background">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-8 font-body text-sm font-semibold tracking-widest text-muted-foreground uppercase">CON LA CONFIANZA DE EQUIPOS EN:</p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16">
                    {logos.map(logo => (
                        <span key={logo} className="font-headline text-xl text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">{logo}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        icon: <Cube size={32} className="text-primary" weight="light" />,
        title: "Visualiza. Control Total.",
        description: "Arrastra y suelta activos en racks virtuales fotorrealistas. Gestiona la capacidad, el peso y la energía en tiempo real. Es tu centro de datos completo, en una sola pantalla.",
        image: "https://placehold.co/1200x800",
        aiHint: "rack visualization"
    },
    {
        icon: <Database size={32} className="text-primary" weight="light" />,
        title: "Centraliza. La Única Fuente de Verdad.",
        description: "Dile adiós para siempre a las hojas de cálculo. Unifica tu inventario de hardware, contratos de soporte y documentación de red en un solo lugar accesible y siempre actualizado.",
        image: "https://placehold.co/1200x800",
        aiHint: "inventory report"
    },
    {
        icon: <Sparkle size={32} className="text-primary" weight="light" />,
        title: "Optimiza. Con la Magia de la IA.",
        description: "Nuestro Asistente IA analiza tu infraestructura para recomendarte la ubicación perfecta para nuevos servidores, identificar riesgos de capacidad y automatizar tus reportes.",
        image: "https://placehold.co/1200x800",
        aiHint: "ai assistant popup"
    }
];

const FeaturesSection = () => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const [featureRefs, setFeatureRefs] = useState<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const refs = features.map((_, i) => document.getElementById(`feature-chapter-${i}`));
        setFeatureRefs(refs as HTMLElement[]);
    }, []);

    const [setElements, entries] = useScrollObserver({ threshold: 0.6, rootMargin: "0px 0px -40% 0px" });

    useEffect(() => {
        setElements(featureRefs.filter(el => el !== null));
    }, [featureRefs, setElements]);

    useEffect(() => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
            const index = parseInt(intersectingEntry.target.id.split('-')[2], 10);
            setActiveFeatureIndex(index);
        }
    }, [entries]);

    return (
        <section className="py-20 lg:py-32 min-h-[300vh] container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="sticky top-24 h-[60vh] md:h-[80vh] w-full">
                    <div className="relative w-full h-full rounded-2xl bg-slate-900/40 p-4 border border-white/10 shadow-2xl shadow-primary/10">
                        <div className="w-full h-full rounded-lg overflow-hidden relative">
                            {features.map((feature, index) => (
                                <Image
                                    key={feature.title}
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={cn(
                                        "object-cover transition-opacity duration-700 ease-in-out",
                                        activeFeatureIndex === index ? "opacity-100" : "opacity-0"
                                    )}
                                    data-ai-hint={feature.aiHint}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-16 md:gap-0">
                    {features.map((feature, index) => (
                        <div key={feature.title} id={`feature-chapter-${index}`} className="h-[90vh] flex items-center">
                            <div className={cn("transition-opacity duration-500", activeFeatureIndex === index ? "opacity-100" : "opacity-30")}>
                                <div className="mb-6">{feature.icon}</div>
                                <h3 className="font-headline text-4xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground text-lg max-w-md">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = {
        monthly: [
            { name: "Profesional", price: "$299", cta: "Empezar Ahora" },
            { name: "Business", price: "$599", cta: "Contactar a Ventas", isHighlighted: true },
            { name: "Enterprise", price: "Contactar", cta: "Contactar a Ventas" },
        ],
        annual: [
            { name: "Profesional", price: "$2,500", cta: "Empezar Ahora" },
            { name: "Business", price: "$6,000", cta: "Contactar a Ventas", isHighlighted: true },
            { name: "Enterprise", price: "Contactar", cta: "Contactar a Ventas" },
        ],
    };

    const currentPlans = isAnnual ? plans.annual : plans.monthly;

    return (
        <section className="py-20 lg:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold">Un Plan para Cada Misión.</h2>
                    <p className="font-body text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Precios transparentes diseñados para escalar contigo.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={cn("font-medium", !isAnnual && "text-primary")}>Facturación Mensual</span>
                        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Cambiar a facturación anual" />
                        <span className={cn("font-medium", isAnnual && "text-primary")}>Facturación Anual (ahorra 20%)</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                    {currentPlans.map((plan) => (
                        <Card key={plan.name} className={cn(
                            "flex flex-col h-full transition-all duration-300 rounded-xl",
                            plan.isHighlighted
                                ? "bg-slate-100 text-background scale-105 shadow-2xl shadow-primary/20"
                                : "glass-card hover:border-primary/70 hover:scale-[1.02]"
                        )}>
                            <CardHeader className="pt-8">
                                <CardTitle className={cn("font-headline text-2xl", plan.isHighlighted ? "text-primary" : "text-foreground")}>{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <span className="font-headline text-4xl font-bold">{plan.price}</span>
                                    <span className={cn("text-muted-foreground", plan.isHighlighted && "text-slate-500")}>{isAnnual ? ' /año' : ' /mes'}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={cn("w-full font-bold text-lg h-12", plan.isHighlighted ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-primary/20 hover:bg-primary/30 text-primary-foreground")}>
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialSection = () => (
    <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-4xl">
            <Card className="glass-card overflow-hidden rounded-2xl">
                <div className="grid md:grid-cols-3 items-center">
                    <div className="md:col-span-1">
                        <Image
                            src="https://placehold.co/400x400"
                            alt="Foto de Carlos Valenzuela"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            data-ai-hint="professional headshot"
                        />
                    </div>
                    <div className="md:col-span-2 p-8 md:p-12">
                        <blockquote className="font-headline text-xl lg:text-2xl font-semibold leading-snug text-foreground">
                            "Nexus transformó nuestro caos en claridad. Lo que antes nos tomaba días de auditoría manual, ahora lo vemos en segundos. Es, sin duda, la herramienta que nuestro data center merecía."
                        </blockquote>
                        <footer className="mt-6">
                            <p className="font-bold text-lg text-foreground/90">Carlos Valenzuela</p>
                            <p className="text-muted-foreground">Gerente de TI, TechCorp Industries</p>
                        </footer>
                    </div>
                </div>
            </Card>
        </div>
    </section>
);


const LeadCaptureSection = () => (
    <section className="py-20 lg:py-32 hero-bg">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                ¿Listo para tomar el control?
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-6">
                Prueba nuestro Diseñador de IDFs gratuito y experimenta la simplicidad y el poder de Nexus. Sin compromisos, sin tarjeta de crédito.
            </p>
            <form className="mt-10 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input type="email" placeholder="Email de Trabajo" className="flex-grow h-14 text-lg bg-white/5 border-white/20 placeholder:text-muted-foreground/80 focus:ring-primary focus:border-primary" />
                    <Button type="submit" size="lg" className="font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 h-14" style={{ animation: 'pulse-glow 3s infinite' }}>
                        Empezar a Diseñar Gratis
                    </Button>
                </div>
            </form>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
                <Sparkle className="h-6 w-6 text-primary" weight="fill" />
                <span className="font-headline text-xl font-bold text-foreground">Nexus</span>
            </div>
            <div className="flex justify-center gap-6 mb-6">
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                </a>
            </div>
            <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-6 font-body text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</a>
            </div>
            <p className="text-muted-foreground font-body text-sm">
                &copy; 2025 Nexus Technologies S.A.P.I. de C.V.
            </p>
        </div>
    </footer>
);
