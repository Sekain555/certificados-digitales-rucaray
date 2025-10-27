import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Ajustes</h1>
                <p className="text-muted-foreground">
                    Gestiona la configuración de tu cuenta.
                </p>
            </div>
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
                        <Input id="name" defaultValue="Usuario de Prueba" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" defaultValue="test@rucaray.cl" disabled />
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>Guardar Perfil</Button>
                </CardFooter>
            </Card>
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
        </div>
    );
}
