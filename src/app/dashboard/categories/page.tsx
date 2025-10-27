"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const mockCategories: Category[] = [
    { id: 'cat1', name: 'Seguridad', color: '#ef4444', requiredSignatures: ['trabajador', 'supervisor'], active: true },
    { id: 'cat2', name: 'Producción', color: '#3b82f6', requiredSignatures: ['trabajador', 'jefe'], active: true },
    { id: 'cat3', name: 'Calidad', color: '#eab308', requiredSignatures: ['trabajador', 'encargada', 'supervisor'], active: true },
    { id: 'cat4', name: 'Mantenimiento', color: '#84cc16', requiredSignatures: ['trabajador', 'supervisor'], active: false },
];

export default function CategoriesPage() {
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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Categorías</h1>
                    <p className="text-muted-foreground">
                        Crea y gestiona las categorías de certificaciones.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nueva Categoría
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Categorías</CardTitle>
                    <CardDescription>Todas las categorías disponibles en el sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Firmas Requeridas</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead><span className="sr-only">Acciones</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCategories.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                                        {cat.name}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {cat.requiredSignatures.map(role => <Badge key={role} variant="secondary">{role}</Badge>)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={cat.active ? "default" : "outline"}>
                                            {cat.active ? "Activa" : "Inactiva"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
