import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewCertificationPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/dashboard/certifications">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
                    Nuevo Registro de Certificación
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                    Descartar
                </Button>
                <Button size="sm">
                    Guardar Registro
                </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información del Registro</CardTitle>
                    <CardDescription>Complete los detalles para la nueva certificación.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" placeholder="Ej: Inducción de Seguridad" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" placeholder="Describa el propósito de esta certificación." />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Seleccione una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="seguridad">Seguridad</SelectItem>
                                    <SelectItem value="produccion">Producción</SelectItem>
                                    <SelectItem value="calidad">Calidad</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="responsible">Responsable</Label>
                            <Select>
                                <SelectTrigger id="responsible">
                                    <SelectValue placeholder="Asignar a un usuario" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user1">Juan Pérez</SelectItem>
                                    <SelectItem value="user2">María González</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Descartar
                </Button>
                <Button size="sm">
                    Guardar Registro
                </Button>
            </div>
        </div>
    );
}
