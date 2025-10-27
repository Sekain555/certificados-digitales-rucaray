
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const mockCategories: Category[] = [
    { id: 'cat1', name: 'Seguridad', color: '#ef4444', requiredSignatures: ['trabajador', 'supervisor'], active: true },
    { id: 'cat2', name: 'Producción', color: '#3b82f6', requiredSignatures: ['trabajador', 'jefe'], active: true },
    { id: 'cat3', name: 'Calidad', color: '#eab308', requiredSignatures: ['trabajador', 'encargada', 'supervisor'], active: false },
];

export function CategoryManagement() {
    return (
        <Card>
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Gestión de Categorías</CardTitle>
                        <CardDescription>Crea y edita las categorías de certificaciones.</CardDescription>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nueva Categoría
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockCategories.map(cat => (
                        <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                                <div className="font-medium">{cat.name}</div>
                                 <Badge variant={cat.active ? "default" : "outline"}>
                                    {cat.active ? "Activa" : "Inactiva"}
                                </Badge>
                            </div>
                            <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
