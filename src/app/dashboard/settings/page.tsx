
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Perfil de Usuario</h1>
                <p className="text-muted-foreground">
                    Gestiona tu información personal y preferencias.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" defaultValue={user?.displayName || ''} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label>Rol Asignado</Label>
                         <Badge variant="secondary" className="text-base">{user?.role}</Badge>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">Guardar Cambios</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Cambio de Contraseña</CardTitle>
                    <CardDescription>
                        Para mayor seguridad, te recomendamos usar una contraseña única.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña Actual</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Actualizar Contraseña</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Preferencias del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                            <span>Modo oscuro</span>
                        </Label>
                        <Switch 
                            id="dark-mode" 
                            checked={theme === 'dark'}
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="theme-mode" className="flex flex-col space-y-1">
                            <span>Usar tema institucional</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Mantiene los colores corporativos de Rucaray.
                            </span>
                        </Label>
                        <Switch id="theme-mode" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="session-mode" className="flex flex-col space-y-1">
                            <span>Mantener sesión iniciada</span>
                        </Label>
                        <Switch id="session-mode" />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
