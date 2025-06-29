import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Box, Database, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Box className="h-10 w-10 text-primary" />,
    title: "Visualiza. No Más Adivinanzas.",
    description: "Arrastra y suelta activos en racks virtuales, gestiona la capacidad en tiempo real y comprende tu infraestructura de un solo vistazo, como si estuvieras físicamente frente al rack.",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Centraliza. Tu Única Fuente de Verdad.",
    description: "Dile adiós a las hojas de cálculo obsoletas y a los diagramas de Visio perdidos. Unifica todo tu inventario, conectividad y estado de los activos en un solo lugar.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Optimiza. La Magia de la IA.",
    description: "Nuestro Asistente IA te ayuda a tomar decisiones más inteligentes, recomendando la ubicación óptima para nuevos servidores basándose en la energía y capacidad disponible.",
  },
];

export function FeaturesSection() {
  return (
    <section id="producto" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            El control que puedes ver.
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Nuestra plataforma está diseñada sobre tres pilares fundamentales que eliminan la incertidumbre y te devuelven el poder.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-background rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="font-body pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
