
"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignaturePad } from "@/components/certifications/SignaturePad";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, UploadCloud } from "lucide-react";

export default function NewCertificationPage() {
    const { toast } = useToast();

    const handleSaveSignature = (signature: string) => {
        console.log("Saving signature...", signature.substring(0, 40) + "...");
        toast({
            title: "Firma guardada",
            description: "La firma se ha añadido al registro.",
        });
    };

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
                    Nuevo Registro de Certificación
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                        Cancelar
                    </Button>
                     <Button variant="secondary" size="sm">
                        Guardar Borrador
                    </Button>
                    <Button size="sm">
                        Enviar para Firma
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalles del Registro</CardTitle>
                    <CardDescription>Complete toda la información requerida para la nueva certificación.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg font-semibold">Información General</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título del Registro</Label>
                                    <Input id="title" placeholder="Ej: Inducción de Seguridad" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea id="description" placeholder="Describa el propósito de esta certificación, los temas cubiertos y los participantes." />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
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
                                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
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
                                                <SelectItem value="user1">Juan Pérez (Supervisor)</SelectItem>
                                                <SelectItem value="user2">María González (Jefa de Planta)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="observations">Observaciones Adicionales</Label>
                                    <Textarea id="observations" placeholder="Añada cualquier observación o comentario relevante para este registro." />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg font-semibold">Firmas Requeridas</AccordionTrigger>
                            <AccordionContent className="pt-4">
                               <p className="text-sm text-muted-foreground mb-4">
                                    Las firmas requeridas se basan en la categoría seleccionada. Firme en el recuadro correspondiente a su rol.
                               </p>
                               <div className="grid md:grid-cols-2 gap-6">
                                    <SignaturePad onSave={handleSaveSignature} />
                                    {/* Aquí se podrían añadir más pads de firma dinámicamente */}
                               </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg font-semibold">Archivos Adjuntos</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                <div className="flex items-center justify-center w-full">
                                    <Label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click para subir</span> o arrastra y suelta
                                            </p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, PDF (MAX. 10MB)</p>
                                        </div>
                                        <Input id="dropzone-file" type="file" className="hidden" />
                                    </Label>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Archivos subidos:</h4>
                                     <p className="text-sm text-muted-foreground">No hay archivos adjuntos.</p>
                                     {/* Aquí se listarán los archivos subidos */}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Cancelar
                </Button>
                <Button variant="secondary" size="sm">
                    Guardar Borrador
                </Button>
                <Button size="sm">
                    Enviar para Firma
                </Button>
            </div>
        </div>
    );
}
