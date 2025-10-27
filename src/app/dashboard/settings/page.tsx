
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { UserManagement } from "@/components/admin/UserManagement";
import { CategoryManagement } from "@/components/admin/CategoryManagement";

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Administración</h1>
                <p className="text-muted-foreground">
                    Gestiona los usuarios, categorías y la configuración de tu cuenta.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfil</CardTitle>
                            <CardDescription>
                                Esta es tu información personal.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" defaultValue={user?.displayName || ''} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Guardar Perfil</Button>
                        </CardFooter>
                    </Card>
                    
                    {user?.role === 'admin' && (
                        <CategoryManagement />
                    )}
                </div>

                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Contraseña</CardTitle>
                            <CardDescription>
                                Cambia tu contraseña. Se recomienda usar una contraseña segura.
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
                        </CardContent>
                        <CardFooter>
                            <Button>Cambiar Contraseña</Button>
                        </CardFooter>
                    </Card>

                    {user?.role === 'admin' && (
                        <UserManagement />
                    )}
                </div>
            </div>
        </div>
    );
}
