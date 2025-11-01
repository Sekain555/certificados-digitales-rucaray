
"use client";

import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const recordTypes = [
    {
        title: "Registro de Inspección de Higiene (RIH)",
        description: "Formulario para la inspección de higiene, calidad e inocuidad en la planta.",
        href: "/dashboard/higiene",
        icon: FileText
    },
    // Futuros tipos de registros se añadirán aquí
];

export default function NewCertificationTypePage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/dashboard/certifications">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
                    Seleccionar Tipo de Registro
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Crear Nuevo Registro</CardTitle>
                    <CardDescription>Elige el tipo de certificación o registro que deseas crear.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {recordTypes.map((type) => (
                        <Link href={type.href} key={type.title} className="block hover-elevate">
                            <Card className="h-full flex flex-col">
                                <CardHeader className="flex-row items-center gap-4">
                                     <type.icon className="w-8 h-8 text-primary" />
                                     <div>
                                        <CardTitle className="text-lg">{type.title}</CardTitle>
                                     </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
