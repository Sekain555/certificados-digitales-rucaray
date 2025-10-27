"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Por favor, ingrese su correo y contraseña.",
      });
      return;
    }
    setIsLoading(true);
    try {
      await login(email);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Correo o contraseña incorrectos",
        description: "Las credenciales son incorrectas. Por favor, inténtelo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Correo corporativo</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@correo.cl"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="h-12 text-base"
        />
      </div>
      <div>
        <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Iniciar sesión
        </Button>
      </div>
       <div className="text-center">
        <Link href="#" className="text-sm hover:underline" style={{ color: '#3A84DF' }}>
            ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
}
