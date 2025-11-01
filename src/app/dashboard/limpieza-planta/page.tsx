
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { SignaturePad } from "@/components/certifications/SignaturePad";
import RucarayLogo from "@/components/RucarayLogo";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface CleaningActivity {
    id: number;
    action: string;
    product: string;
    dose: string;
    responsibleName: string;
    date: string;
    observation: string;
    signature: string | null;
}

export default function LimpiezaPlantaPage() {
    const { toast } = useToast();
    const [activities, setActivities] = useState<CleaningActivity[]>([
        { id: 1, action: '', product: '', dose: '', responsibleName: '', date: '', observation: '', signature: null }
    ]);

    const handleAddRow = () => {
        setActivities(prev => [
            ...prev,
            { id: Date.now(), action: '', product: '', dose: '', responsibleName: '', date: '', observation: '', signature: null }
        ]);
    };

    const handleRemoveRow = (id: number) => {
        setActivities(prev => prev.filter(activity => activity.id !== id));
    };

    const handleActivityChange = (id: number, field: keyof CleaningActivity, value: string) => {
        setActivities(prev => prev.map(activity =>
            activity.id === id ? { ...activity, [field]: value } : activity
        ));
    };

    const handleSaveSignature = (signature: string, type: 'responsible' | 'supervisor' | 'jefe', activityId?: number) => {
        if (activityId) {
             setActivities(prev => prev.map(activity =>
                activity.id === activityId ? { ...activity, signature: signature } : activity
            ));
        }
        console.log(`Saving ${type} signature...`, signature.substring(0, 40) + "...");
        toast({
            title: "Firma guardada",
            description: "La firma se ha añadido al registro.",
        });
    };

    return (
        <div className="space-y-6">
            <header className="rounded-lg border bg-primary text-primary-foreground shadow-sm p-4 relative">
                <div className="flex items-center justify-between">
                    <RucarayLogo className="h-16 w-auto" />
                    <div className="text-center">
                        <h1 className="text-lg font-bold font-headline text-white">
                            REGISTRO DE LIMPIEZA Y SANITIZACIÓN DE ENTORNOS DE LA PLANTA
                        </h1>
                        <p className="text-xs text-white/80">
                            Código: RLSEP | Versión: 03 | Planta Los Lirios | Sistema de Gestión
                        </p>
                    </div>
                    <div className="w-24"></div> {/* Spacer */}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600"></div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Datos Generales</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="registro-date">Fecha de Registro</Label>
                        <Input id="registro-date" type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Input id="sector" placeholder="Ej: Packing" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="elaborador">Elaborador</Label>
                        <Input id="elaborador" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aprobador">Aprobador</Label>
                        <Select>
                            <SelectTrigger id="aprobador">
                                <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="supervisor">Supervisor</SelectItem>
                                <SelectItem value="jefe_operaciones">Jefe de Operaciones</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Registro de Actividades de Limpieza</CardTitle>
                    <CardDescription>Añade una fila por cada actividad de limpieza o sanitización realizada.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">Lavado/Sanitización</TableHead>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Dosis</TableHead>
                                    <TableHead>Nombre Responsable</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="min-w-[250px]">Observación</TableHead>
                                    <TableHead>Firma Responsable</TableHead>
                                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>
                                            <Input placeholder="Área o elemento" value={activity.action} onChange={e => handleActivityChange(activity.id, 'action', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Ej: Hipoclorito" value={activity.product} onChange={e => handleActivityChange(activity.id, 'product', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Ej: 5%" value={activity.dose} onChange={e => handleActivityChange(activity.id, 'dose', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Nombre" value={activity.responsibleName} onChange={e => handleActivityChange(activity.id, 'responsibleName', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="date" value={activity.date} onChange={e => handleActivityChange(activity.id, 'date', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Textarea placeholder="Observaciones..." value={activity.observation} onChange={e => handleActivityChange(activity.id, 'observation', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'responsible', activity.id)} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(activity.id)} disabled={activities.length <= 1}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAddRow} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar nueva fila
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Firmas Generales</CardTitle>
                    <CardDescription>Firmas del responsable de elaboración y aprobación final del registro.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Responsable Elaboración</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'responsible')} />
                    </div>
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Supervisor</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'supervisor')} />
                    </div>
                     <div>
                        <h4 className="font-medium text-center mb-2">Firma Jefe de Operaciones</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'jefe')} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
                <Button variant="outline">Guardar borrador</Button>
                <Button className="bg-green-600 hover:bg-green-700">Enviar Registro</Button>
                <Button variant="default">Descargar PDF</Button>
            </div>
        </div>
    );
}
