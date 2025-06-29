import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Box, Database, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Box className="h-10 w-10 text-primary" />,
    title: "Visualización Interactiva",
    description: "Crea y manipula diseños complejos en tiempo real con nuestra interfaz intuitiva y potente.",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Documentación Centralizada",
    description: "Mantén todos tus activos de diseño, componentes y guías de estilo en un solo lugar accesible.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Asistente de IA Inteligente",
    description: "Acelera tu flujo de trabajo con sugerencias inteligentes, generación de activos y optimización automática.",
  },
];

export function FeaturesSection() {
  return (
    <section id="caracteristicas" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Una Suite de Herramientas de Diseño Revolucionaria
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Nexus Simplified combina visualización, documentación y IA para ofrecer una experiencia de diseño sin precedentes.
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
