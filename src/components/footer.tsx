export function Footer() {
  return (
    <footer className="py-6 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground font-body">
        <p>&copy; {new Date().getFullYear()} Nexus Simplified. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
