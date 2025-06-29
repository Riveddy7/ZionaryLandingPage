"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
});

const benefits = [
  "Crea diagramas profesionales en minutos.",
  "Exporta tus diseños para cotizaciones y reportes.",
  "Experimenta la magia de la interfaz de Nexus.",
];


export function LeadCaptureDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOpen(false);
    form.reset();

    toast({
      title: "¡Acceso Concedido!",
      description: "Revisa tu email para empezar a usar el diseñador.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <DialogTitle className="font-headline text-2xl text-primary">Deja de Imaginar. Empieza a Verlo.</DialogTitle>
          <DialogDescription className="font-body pt-2">
            Obtén acceso inmediato a nuestro Diseñador de IDFs. Una herramienta 100% gratuita para planificar tus racks de forma visual e intuitiva.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2 py-4">
            {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{benefit}</span>
                </div>
            ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-muted-foreground">Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} className="font-body" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-muted-foreground">Email de Trabajo</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="juan.perez@tuempresa.com" {...field} className="font-body" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col items-center">
               <Button type="submit" disabled={isSubmitting} className="w-full font-body font-bold">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accediendo...
                  </>
                ) : (
                  "Acceder a la Herramienta Gratuita"
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Respetamos tu privacidad. Sin spam.</p>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
