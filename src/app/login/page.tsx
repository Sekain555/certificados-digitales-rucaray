import { LoginForm } from '@/components/auth/LoginForm';
import RucarayLogo from '@/components/RucarayLogo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Link href="/" className="inline-block">
              <RucarayLogo className="mx-auto h-16 w-auto text-primary" />
            </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline">
            Accede a tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sistema de Certificaciones Rucaray Digital
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
