
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
import { Textarea } from "@/components/ui/textarea";
import { SignaturePad } from "@/components/certifications/SignaturePad";
import RucarayLogo from "@/components/RucarayLogo";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CleaningActivity {
    id: number;
    instalacion: string;
    tipoAccion: 'L' | 'S' | null;
    producto: string;
    dosis: string;
    ejecutor: string;
    fecha: string;
    hora: string;
    signature: string | null;
    observation: string;
}

const sanitaryInstallations = [
    "Baño Mujeres",
    "Baño Varones",
    "Urinarios",
    "Lavamanos",
    "Duchas",
    "Paredes",
    "Pisos"
];

export default function LimpiezaBanosPage() {
    const { toast } = useToast();
    const [activities, setActivities] = useState<CleaningActivity[]>([
        { id: 1, instalacion: '', tipoAccion: null, producto: '', dosis: '', ejecutor: '', fecha: '', hora: '', signature: null, observation: '' }
    ]);

    const handleAddRow = () => {
        setActivities(prev => [
            ...prev,
            { id: Date.now(), instalacion: '', tipoAccion: null, producto: '', dosis: '', ejecutor: '', fecha: '', hora: '', signature: null, observation: '' }
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

    const handleSaveSignature = (signature: string, type: 'ejecutor' | 'responsable' | 'aprobador', activityId?: number) => {
        if (activityId && type === 'ejecutor') {
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
            <header className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-2 border-r">
                        <RucarayLogo className="h-12 w-auto" />
                        <p className="font-semibold mt-1 text-center">Rucaray</p>
                        <p className="text-sm text-center">Planta Los Lirios</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                         <p className="font-semibold">Sistema de Gestión</p>
                         <h1 className="text-lg font-bold font-headline mt-2 text-primary">
                            Registro de Limpieza y Sanitización de Instalaciones Sanitarias
                        </h1>
                    </div>
                    <div className="text-sm p-2">
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                            <span className="font-semibold">Codigo</span>
                            <span>: RLSIS</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-2">
                            <span className="font-semibold">Versión</span>
                            <span>: 3</span>
                        </div>
                    </div>
                </div>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Datos Generales</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="area">Área</Label>
                        <Input id="area" placeholder="Ej: Planta Los Lirios" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="elaborador">Elaborador</Label>
                        <Input id="elaborador" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aprobador">Aprobador</Label>
                        <Input id="aprobador" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                         <Label>Turno</Label>
                         <RadioGroup className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="dia" id="dia" /><Label htmlFor="dia">Día</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="noche" id="noche" /><Label htmlFor="noche">Noche</Label></div>
                         </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fecha-elaboracion">Fecha de Elaboración</Label>
                        <Input id="fecha-elaboracion" type="date" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Registro de Actividades</CardTitle>
                    <CardDescription>Complete una fila por cada actividad de limpieza realizada.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="w-full overflow-x-auto">
                        <div className="grid gap-4 items-center p-2 font-semibold text-sm text-muted-foreground border-b mb-4" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1.5fr 1fr auto' }}>
                            <div className="text-center">Instalación Sanitaria</div>
                            <div className="text-center">Tipo de Acción</div>
                            <div className="text-center">Producto</div>
                            <div className="text-center">Dosis</div>
                            <div className="text-center">Nombre Ejecutor</div>
                            <div className="text-center">Fecha</div>
                            <div className="text-center">Hora</div>
                            <div className="text-center">Firma Ejecutor</div>
                            <div className="text-center">Observación</div>
                            <div className="w-8"></div>
                        </div>

                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="grid gap-2 items-start p-2 border-b" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1.5fr 1fr auto' }}>
                                    <Select onValueChange={(val) => handleActivityChange(activity.id, 'instalacion', val)}>
                                        <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                        <SelectContent>
                                            {sanitaryInstallations.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(val) => handleActivityChange(activity.id, 'tipoAccion', val)}>
                                        <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">Limpieza (L)</SelectItem>
                                            <SelectItem value="S">Limpieza y Sanitización (S)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input placeholder="Producto" value={activity.producto} onChange={e => handleActivityChange(activity.id, 'producto', e.target.value)} />
                                    <Input placeholder="Dosis" value={activity.dosis} onChange={e => handleActivityChange(activity.id, 'dosis', e.target.value)} />
                                    <Input placeholder="Nombre" value={activity.ejecutor} onChange={e => handleActivityChange(activity.id, 'ejecutor', e.target.value)} />
                                    <Input type="date" value={activity.fecha} onChange={e => handleActivityChange(activity.id, 'fecha', e.target.value)} />
                                    <Input type="time" value={activity.hora} onChange={e => handleActivityChange(activity.id, 'hora', e.target.value)} />
                                    <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'ejecutor', activity.id)} simple />
                                    <Textarea placeholder="Observaciones..." value={activity.observation} onChange={e => handleActivityChange(activity.id, 'observation', e.target.value)} className="min-h-[60px]" />
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(activity.id)} disabled={activities.length <= 1}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
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
                    <CardDescription>Firmas del responsable de ejecución y el aprobador final del registro.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Responsable de Ejecución</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'responsable')} />
                    </div>
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Aprobador (Jefe de Operaciones)</h4>
                        <SignaturePad onSave={(sig) => handleSaveSignature(sig, 'aprobador')} />
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
