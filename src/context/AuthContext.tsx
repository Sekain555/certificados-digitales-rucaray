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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRoleFromEmail = (email: string): UserRole => {
  if (email.includes('admin')) return 'admin';
  if (email.includes('encargada')) return 'encargada';
  if (email.includes('jefe')) return 'jefe';
  if (email.includes('supervisor')) return 'supervisor';
  return 'trabajador';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        const userRole = getRoleFromEmail(firebaseUser.email || '');
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          photoURL: firebaseUser.photoURL,
          role: userRole,
        };
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isProtectedRoute = pathname.startsWith('/dashboard');
  
  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.push('/login');
    }
  }, [user, loading, pathname, router, isProtectedRoute]);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  const value = useMemo(() => ({ user, loading, logout }), [user, loading]);

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
