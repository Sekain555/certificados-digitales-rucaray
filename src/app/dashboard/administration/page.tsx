
"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserManagement } from "@/components/admin/UserManagement";
import { CategoryManagement } from "@/components/admin/CategoryManagement";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


export default function AdministrationPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user?.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading || user?.role !== 'admin') {
        return <p className="p-4">Acceso denegado. Redirigiendo...</p>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Administración</h1>
                <p className="text-muted-foreground">
                    Gestiona los usuarios, categorías y la configuración general del sistema.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-6">
                    <UserManagement />
                    <CategoryManagement />
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferencias Generales</CardTitle>
                            <CardDescription>
                                Ajusta la configuración global para todos los usuarios.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="dark-mode-default" className="flex flex-col space-y-1">
                                    <span>Modo oscuro predeterminado</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Establece el modo oscuro como el tema por defecto para nuevos usuarios.
                                    </span>
                                </Label>
                                <Switch id="dark-mode-default" />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="pdf-download" className="flex flex-col space-y-1">
                                    <span>Permitir descarga de PDF</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Habilita o deshabilita la opción de descargar certificaciones en PDF.
                                    </span>
                                </Label>
                                <Switch id="pdf-download" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="reminders" className="flex flex-col space-y-1">
                                    <span>Recordatorios de firmas pendientes</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Activa las notificaciones automáticas para firmas pendientes.
                                    </span>
                                </Label>
                                <Switch id="reminders" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Guardar Configuración</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
