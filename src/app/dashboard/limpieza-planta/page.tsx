
"use client";

import { useState, useEffect } from "react";
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
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import { mockSectors, mockProducts, mockResponsible } from "@/lib/limpieza-planta-data";

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
    const [registroDate, setRegistroDate] = useState('');
    const [isSending, setIsSending] = useState(false);
    
    // Final signatures
    const [elaboradorSignature, setElaboradorSignature] = useState<string | null>(null);
    const [jefeSignature, setJefeSignature] = useState<string | null>(null);


    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        setRegistroDate(`${year}-${month}-${day}`);
    }, []);


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

    const handleSaveSignature = (signature: string, type: 'elaborador' | 'jefe' | 'activityResponsible' | 'activitySupervisor', activityId?: number) => {
        if (activityId) {
            if (type === 'activityResponsible') {
                setActivities(prev => prev.map(activity =>
                    activity.id === activityId ? { ...activity, signature: signature } : activity
                ));
            }
            if (type === 'activitySupervisor') {
                setActivities(prev => prev.map(activity =>
                    activity.id === activityId ? { ...activity, supervisorSignature: signature } : activity
                ));
            }
        } else {
             if (type === 'elaborador') setElaboradorSignature(signature);
             if (type === 'jefe') setJefeSignature(signature);
        }

        console.log(`Saving ${type} signature...`);
        toast({
            title: "Firma guardada",
            description: "La firma se ha añadido al registro.",
        });
    };

    const handleDeleteSignature = (type: 'elaborador' | 'jefe' | 'activityResponsible' | 'activitySupervisor', activityId?: number) => {
        if (activityId) {
             if (type === 'activityResponsible') {
                setActivities(prev => prev.map(act => act.id === activityId ? { ...act, signature: null } : act));
            }
            if (type === 'activitySupervisor') {
                setActivities(prev => prev.map(act => act.id === activityId ? { ...act, supervisorSignature: null } : act));
            }
        } else {
            if (type === 'elaborador') setElaboradorSignature(null);
            if (type === 'jefe') setJefeSignature(null);
        }
        toast({
            title: "Firma eliminada",
            variant: "destructive"
        });
    };

    const isFormComplete =
        registroDate.trim() !== '' &&
        activities.every(act =>
            act.sector.trim() !== '' &&
            act.retiroBasura !== null &&
            act.lavado !== null &&
            act.sanitizacionProducto.trim() !== '' &&
            act.sanitizacionDosis.trim() !== '' &&
            act.responsibleName.trim() !== '' &&
            act.signature !== null &&
            act.supervisorSignature !== null
        ) &&
        elaboradorSignature !== null &&
        jefeSignature !== null;

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
                        <h1 className="text-lg font-bold font-headline mt-2">
                            Registro de Limpieza y Sanitización Entornos de la Planta
                        </h1>
                    </div>
                    <div className="text-sm p-2">
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                            <span className="font-semibold">Codigo</span>
                            <span>: RLSEP</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
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
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="registro-date">Fecha de Registro</Label>
                        <Input id="registro-date" type="date" className="w-full md:w-1/3" value={registroDate} onChange={e => setRegistroDate(e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sectores</CardTitle>
                    <CardDescription>Complete una tarjeta por cada sector. La fecha es general para todo el registro.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {activities.map((activity, index) => (
                             <div key={activity.id} className="p-4 border rounded-lg space-y-4">
                               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                 <div className="space-y-2">
                                     <Label htmlFor={`sector-${activity.id}`} className="text-xs text-muted-foreground">Sector</Label>
                                     <Combobox
                                        options={mockSectors}
                                        selectedValue={activity.sector}
                                        onSelectValue={(val) => handleActivityChange(activity.id, 'sector', val)}
                                        placeholder="Seleccionar sector..."
                                        searchPlaceholder="Buscar sector..."
                                        noResultsText="No se encontró."
                                    />
                                 </div>
                                 <div className="space-y-2">
                                     <Label htmlFor={`sanit-prod-${activity.id}`} className="text-xs text-muted-foreground">Producto Sanit.</Label>
                                     <Combobox
                                        options={mockProducts}
                                        selectedValue={activity.sanitizacionProducto}
                                        onSelectValue={(val) => handleActivityChange(activity.id, 'sanitizacionProducto', val)}
                                        placeholder="Seleccionar producto..."
                                        searchPlaceholder="Buscar producto..."
                                        noResultsText="No se encontró."
                                    />
                                 </div>
                                 <div className="space-y-2">
                                     <Label htmlFor={`sanit-dosis-${activity.id}`} className="text-xs text-muted-foreground">Dosis Sanit.</Label>
                                     <Input id={`sanit-dosis-${activity.id}`} placeholder="Dosis" value={activity.sanitizacionDosis} onChange={e => handleActivityChange(activity.id, 'sanitizacionDosis', e.target.value)} />
                                 </div>
                                 <div className="space-y-2">
                                     <Label htmlFor={`resp-name-${activity.id}`} className="text-xs text-muted-foreground">Nombre Responsable</Label>
                                     <Combobox
                                        options={mockResponsible}
                                        selectedValue={activity.responsibleName}
                                        onSelectValue={(val) => handleActivityChange(activity.id, 'responsibleName', val)}
                                        placeholder="Seleccionar responsable..."
                                        searchPlaceholder="Buscar responsable..."
                                        noResultsText="No se encontró."
                                    />
                                 </div>
                                 
                                  <div className="space-y-2">
                                     <Label className="text-xs text-muted-foreground">Retiro Basura</Label>
                                     <RadioGroup value={activity.retiroBasura ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'retiroBasura', val)} className="flex gap-4 pt-2">
                                         <div className="flex items-center space-x-1"><RadioGroupItem value="si" id={`retiro-si-${activity.id}`} /><Label htmlFor={`retiro-si-${activity.id}`}>Si</Label></div>
                                         <div className="flex items-center space-x-1"><RadioGroupItem value="no" id={`retiro-no-${activity.id}`} /><Label htmlFor={`retiro-no-${activity.id}`}>No</Label></div>
                                     </RadioGroup>
                                 </div>
                                 <div className="space-y-2">
                                     <Label className="text-xs text-muted-foreground">Lavado</Label>
                                     <RadioGroup value={activity.lavado ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'lavado', val)} className="flex gap-4 pt-2">
                                         <div className="flex items-center space-x-1"><RadioGroupItem value="si" id={`lavado-si-${activity.id}`} /><Label htmlFor={`lavado-si-${activity.id}`}>Si</Label></div>
                                         <div className="flex items-center space-x-1"><RadioGroupItem value="no" id={`lavado-no-${activity.id}`} /><Label htmlFor={`lavado-no-${activity.id}`}>No</Label></div>
                                     </RadioGroup>
                                 </div>
                                 <div className="space-y-2 md:col-span-2">
                                     <Label htmlFor={`obs-${activity.id}`} className="text-xs text-muted-foreground">Observación</Label>
                                     <Textarea id={`obs-${activity.id}`} placeholder="Observaciones..." value={activity.observation} onChange={e => handleActivityChange(activity.id, 'observation', e.target.value)} className="min-h-[40px]" />
                                 </div>
                               </div>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                    <div className="space-y-2">
                                    <h4 className="font-medium text-center mb-2">Firma Responsable</h4>
                                        <SignaturePad signatureUrl={activity.signature} onSave={(sig) => handleSaveSignature(sig, 'activityResponsible', activity.id)} onDelete={() => handleDeleteSignature('activityResponsible', activity.id)} canEdit={true} simple />
                                    </div>
                                     <div className="space-y-2">
                                        <h4 className="font-medium text-center mb-2">V°B° Supervisor</h4>
                                        <SignaturePad signatureUrl={activity.supervisorSignature} onSave={(sig) => handleSaveSignature(sig, 'activitySupervisor', activity.id)} onDelete={() => handleDeleteSignature('activitySupervisor', activity.id)} canEdit={true} simple />
                                    </div>
                               </div>

                               <div className="flex justify-end">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(activity.id)} disabled={activities.length <= 1}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAddRow} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar nuevo sector
                    </Button>
                </CardContent>
            </Card>

            <footer>
                <Card>
                    <CardContent className="p-2 text-xs text-muted-foreground">
                        <div className="grid grid-cols-2 divide-x">
                            <div className="p-2">
                                <p className="font-semibold">Elaborado por: Equipo Sistema de Gestión</p>
                                <p>Fecha: Junio 2007</p>
                            </div>
                            <div className="p-2">
                                <p className="font-semibold">Aprobado por: Jefe Operaciones</p>
                                <p>Actualizacion: Agosto 2022</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </footer>

            <div className="flex justify-center gap-4">
                <Button variant="outline" disabled={isSending}>Guardar borrador</Button>
                <Button className="bg-green-600 hover:bg-green-700" disabled={!isFormComplete || isSending}>
                    {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enviar Registro
                </Button>
                <Button variant="default" disabled={!isFormComplete || isSending}>Descargar PDF</Button>
            </div>
        </div>
    );
}

    
