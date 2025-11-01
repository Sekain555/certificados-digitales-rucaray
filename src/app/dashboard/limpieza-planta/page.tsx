
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CleaningActivity {
    id: number;
    sector: string;
    retiroBasura: 'si' | 'no' | null;
    lavado: 'si' | 'no' | null;
    sanitizacionProducto: string;
    sanitizacionDosis: string;
    responsibleName: string;
    signature: string | null;
    observation: string;
    supervisorSignature: string | null;
}

export default function LimpiezaPlantaPage() {
    const { toast } = useToast();
    const [activities, setActivities] = useState<CleaningActivity[]>([
        { id: 1, sector: '', retiroBasura: null, lavado: null, sanitizacionProducto: '', sanitizacionDosis: '', responsibleName: '', signature: null, observation: '', supervisorSignature: null }
    ]);

    const handleAddRow = () => {
        setActivities(prev => [
            ...prev,
            { id: Date.now(), sector: '', retiroBasura: null, lavado: null, sanitizacionProducto: '', sanitizacionDosis: '', responsibleName: '', signature: null, observation: '', supervisorSignature: null }
        ]);
    };

    const handleRemoveRow = (id: number) => {
        setActivities(prev => prev.filter(activity => activity.id !== id));
    };

    const handleActivityChange = (id: number, field: keyof CleaningActivity, value: any) => {
        setActivities(prev => prev.map(activity =>
            activity.id === id ? { ...activity, [field]: value } : activity
        ));
    };

    const handleSaveSignature = (signature: string, type: 'responsible' | 'supervisor' | 'jefe' | 'activityResponsible' | 'activitySupervisor', activityId?: number) => {
        if (activityId && type === 'activityResponsible') {
             setActivities(prev => prev.map(activity =>
                activity.id === activityId ? { ...activity, signature: signature } : activity
            ));
        }
        if (activityId && type === 'activitySupervisor') {
             setActivities(prev => prev.map(activity =>
                activity.id === activityId ? { ...activity, supervisorSignature: signature } : activity
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
            <header className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-2 border-r">
                        <RucarayLogo className="h-12 w-auto" />
                        <p className="font-semibold mt-1">Packing y Servicios Rucaray</p>
                        <p className="text-sm">Planta Los Lirios</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                         <p className="font-semibold">Sistema de Gestión</p>
                         <h1 className="text-lg font-bold font-headline mt-2">
                            Registro de Limpieza y Sanitización Entornos de la Planta
                        </h1>
                    </div>
                    <div className="text-sm p-2">
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                            <span className="font-semibold">Codigo</span>
                            <span>:RLSEP</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                            <span className="font-semibold">Versión</span>
                            <span>:03</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-2">
                            <span className="font-semibold">N° de Paginas</span>
                            <span>:1</span>
                        </div>
                    </div>
                </div>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Registro de Actividades</CardTitle>
                    <CardDescription>Complete una fila por cada sector. La fecha es general para todo el registro.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="mb-6">
                        <Label htmlFor="registro-date">Fecha General del Registro</Label>
                        <Input id="registro-date" type="date" className="w-full md:w-1/3" />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px]">Sector</TableHead>
                                    <TableHead colSpan={2} className="text-center border-l border-r">Retiro de Basura</TableHead>
                                    <TableHead colSpan={2} className="text-center border-l border-r">Lavado</TableHead>
                                    <TableHead colSpan={2} className="text-center border-l border-r">Sanitización</TableHead>
                                    <TableHead className="min-w-[150px]">Nombre Responsable</TableHead>
                                    <TableHead className="min-w-[200px]">Firma Responsable</TableHead>
                                    <TableHead className="min-w-[200px]">Observacion</TableHead>
                                    <TableHead className="min-w-[200px]">V°B° supervisor</TableHead>
                                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead><span className="sr-only">Sector</span></TableHead>
                                    <TableHead className="text-center border-l">Si</TableHead>
                                    <TableHead className="text-center border-r">No</TableHead>
                                    <TableHead className="text-center border-l">Si</TableHead>
                                    <TableHead className="text-center border-r">No</TableHead>
                                    <TableHead className="border-l">Producto</TableHead>
                                    <TableHead className="border-r">Dosis</TableHead>
                                    <TableHead><span className="sr-only">Nombre</span></TableHead>
                                    <TableHead><span className="sr-only">Firma</span></TableHead>
                                    <TableHead><span className="sr-only">Observacion</span></TableHead>
                                    <TableHead><span className="sr-only">V°B°</span></TableHead>
                                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>
                                            <Input placeholder="Ej: Packing" value={activity.sector} onChange={e => handleActivityChange(activity.id, 'sector', e.target.value)} />
                                        </TableCell>
                                        <TableCell className="text-center border-l">
                                            <RadioGroup value={activity.retiroBasura ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'retiroBasura', val)} className="justify-center">
                                                <RadioGroupItem value="si" id={`retiro-si-${activity.id}`} />
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell className="text-center border-r">
                                            <RadioGroup value={activity.retiroBasura ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'retiroBasura', val)} className="justify-center">
                                                 <RadioGroupItem value="no" id={`retiro-no-${activity.id}`} />
                                            </RadioGroup>
                                        </TableCell>
                                         <TableCell className="text-center border-l">
                                            <RadioGroup value={activity.lavado ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'lavado', val)} className="justify-center">
                                                <RadioGroupItem value="si" id={`lavado-si-${activity.id}`} />
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell className="text-center border-r">
                                            <RadioGroup value={activity.lavado ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'lavado', val)} className="justify-center">
                                                 <RadioGroupItem value="no" id={`lavado-no-${activity.id}`} />
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell className="border-l">
                                            <Input placeholder="Producto" value={activity.sanitizacionProducto} onChange={e => handleActivityChange(activity.id, 'sanitizacionProducto', e.target.value)} />
                                        </TableCell>
                                        <TableCell className="border-r">
                                            <Input placeholder="Dosis" value={activity.sanitizacionDosis} onChange={e => handleActivityChange(activity.id, 'sanitizacionDosis', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Nombre" value={activity.responsibleName} onChange={e => handleActivityChange(activity.id, 'responsibleName', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'activityResponsible', activity.id)} />
                                        </TableCell>
                                        <TableCell>
                                            <Textarea placeholder="Observaciones..." value={activity.observation} onChange={e => handleActivityChange(activity.id, 'observation', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'activitySupervisor', activity.id)} />
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
                    <CardTitle>Firmas de Aprobación Final</CardTitle>
                    <CardDescription>Firmas del elaborador y aprobador final del registro.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Elaborador</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'responsible')} />
                    </div>
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Aprobador (Jefe de Operaciones)</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'jefe')} />
                    </div>
                </CardContent>
            </Card>

            <Card as="footer">
                <CardContent className="p-2 text-xs text-muted-foreground">
                    <div className="grid grid-cols-3 divide-x">
                        <div className="p-2">
                            <p className="font-semibold">Elaborador:</p>
                            <p>Fecha: Junio 2007</p>
                        </div>
                        <div className="p-2">
                             <p className="font-semibold">Equipo Sistema de Gestión</p>
                             <p>Actualizacion: Agosto 2022</p>
                        </div>
                         <div className="p-2">
                             <p className="font-semibold">Aprobador: Jefe Operaciones</p>
                             <p>Pag: 1 de 1</p>
                        </div>
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
