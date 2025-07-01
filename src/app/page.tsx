
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Sparkle } from "lucide-react";
import { FeaturesMosaic } from '@/components/features-mosaic';
import { HeroSection } from '@/components/hero-section';
import { PricingSection } from '@/components/pricing-section';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function HomePage() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    return (
        <div className="bg-[#111111] text-foreground font-sans antialiased">
            <Navbar onLinkClick={{
                features: () => scrollTo(featuresRef),
                pricing: () => scrollTo(pricingRef),
                testimonials: () => scrollTo(testimonialsRef),
            }} />
            <main>
                <HeroSection />
                <TrustBar />
                <div ref={featuresRef}>
                    <FeaturesMosaic />
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
        <header className="w-full max-w-4xl mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-md">
            <div className="flex h-14 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <Sparkle className="h-6 w-6 text-primary" fill="currentColor" />
                    <span className="font-sans text-xl font-bold text-foreground">Zionary</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <button onClick={onLinkClick.features} className="text-muted-foreground transition-colors hover:text-primary">Características</button>
                    <button onClick={onLinkClick.pricing} className="text-muted-foreground transition-colors hover:text-primary">Precios</button>
                    <button onClick={onLinkClick.testimonials} className="text-muted-foreground transition-colors hover:text-primary">Testimonios</button>
                </nav>
                <Button size="sm" className="font-bold bg-primary/90 hover:bg-primary text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                    Entrar a Zionary
                </Button>
            </div>
        </header>
    </div>
);

const TrustBar = () => {
    const logos = ["TechCorp", "Industrias de México", "Logística Global", "Bajanet", "Syscom"];
    return (
        <div className="py-12 bg-[#111111]">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-8 font-sans text-sm font-semibold tracking-widest text-muted-foreground uppercase">CON LA CONFIANZA DE EQUIPOS EN:</p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16">
                    {logos.map(logo => (
                        <span key={logo} className="font-sans text-xl text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">{logo}</span>
                    ))}
                </div>
            </div>
        </div>
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
                        <blockquote className="font-sans text-xl lg:text-2xl font-semibold leading-snug text-foreground">
                            "Zionary transformó nuestro caos en claridad. Lo que antes nos tomaba días de auditoría manual, ahora lo vemos en segundos. Es, sin duda, la herramienta que nuestro data center merecía."
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
    <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                ¿Listo para tomar el control?
            </h2>
            <p className="font-sans text-lg text-muted-foreground mt-6">
                Prueba nuestro Diseñador de IDFs gratuito y experimenta la simplicidad y el poder de Zionary. Sin compromisos, sin tarjeta de crédito.
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
                <Sparkle className="h-6 w-6 text-primary" fill="currentColor" />
                <span className="font-sans text-xl font-bold text-foreground">Zionary</span>
            </div>
            <div className="flex justify-center gap-6 mb-6">
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                </a>
            </div>
            <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-6 font-sans text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</a>
            </div>
            <p className="text-muted-foreground font-sans text-sm">
                &copy; 2025 Zionary Technologies S.A.P.I. de C.V.
            </p>
        </div>
    </footer>
);
