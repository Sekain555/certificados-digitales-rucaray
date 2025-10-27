"use client";

import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { UserProfile, UserRole } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import RucarayLogo from '@/components/RucarayLogo';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRoleFromEmail = (email: string): UserRole => {
  if (email.includes('admin')) return 'admin';
  if (email.includes('encargada')) return 'encargada';
  if (email.includes('jefe')) return 'jefe';
  if (email.includes('supervisor')) return 'supervisor';
  return 'trabajador';
}

const MOCK_USERS: { [key: string]: UserProfile } = {
    'admin@rucaray.cl': { uid: 'admin-uid', email: 'admin@rucaray.cl', displayName: 'Admin Rucaray', photoURL: null, role: 'admin' },
    'supervisor@rucaray.cl': { uid: 'supervisor-uid', email: 'supervisor@rucaray.cl', displayName: 'Supervisor de Calidad', photoURL: null, role: 'supervisor' },
    'trabajador@rucaray.cl': { uid: 'trabajador-uid', email: 'trabajador@rucaray.cl', displayName: 'Juan Trabajador', photoURL: null, role: 'trabajador' },
    'jefe@rucaray.cl': { uid: 'jefe-uid', email: 'jefe@rucaray.cl', displayName: 'Jefe de Planta', photoURL: null, role: 'jefe' },
    'encargada@rucaray.cl': { uid: 'encargada-uid', email: 'encargada@rucaray.cl', displayName: 'Encargada de Bodega', photoURL: null, role: 'encargada' },
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isProtectedRoute = pathname.startsWith('/dashboard');
  
  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.push('/login');
    }
  }, [user, loading, pathname, router, isProtectedRoute]);

  const login = async (email: string) => {
    const mockUser = MOCK_USERS[email];
    if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        router.push('/dashboard');
    } else {
        throw new Error("Usuario no encontrado");
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };
  
  const value = useMemo(() => ({ user, loading, logout, login }), [user, loading]);

  if (loading && isProtectedRoute) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <RucarayLogo className="h-16 w-16 text-primary mb-4" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
