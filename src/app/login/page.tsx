import { LoginForm } from '@/components/auth/LoginForm';
import RucarayLogo from '@/components/RucarayLogo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <header className="absolute top-0 right-0 p-4">
        <ThemeToggle />
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
