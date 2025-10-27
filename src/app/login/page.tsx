import { LoginForm } from '@/components/auth/LoginForm';
import RucarayLogo from '@/components/RucarayLogo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <header className="absolute top-0 right-0 p-4">
        {/* Este es un placeholder para el dark mode toggle, no es funcional */}
        <Button variant="ghost" size="icon">
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
      <main className="w-full max-w-sm">
        <div className="text-center mb-8">
            <RucarayLogo className="mx-auto h-16 w-auto text-primary" />
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primary font-headline">
              Certificaciones Rucaray
            </h1>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </main>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>Planta Los Lirios © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
