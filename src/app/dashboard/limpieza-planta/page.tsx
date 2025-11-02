
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
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
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
    const [registroDate, setRegistroDate] = useState('');
    const [elaboradorSignature, setElaboradorSignature] = useState<string | null>(null);
    const [jefeSignature, setJefeSignature] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);


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
            if (type === 'elaborador') {
                setElaboradorSignature(signature);
            }
            if (type === 'jefe') {
                setJefeSignature(signature);
            }
        }

        console.log(`Saving ${type} signature...`);
        toast({
            title: "Firma guardada",
            description: "La firma se ha añadido al registro.",
        });
    };

    const isFormComplete = 
        registroDate.trim() !== '' &&
        elaboradorSignature !== null &&
        jefeSignature !== null &&
        activities.every(act => 
            act.sector.trim() !== '' &&
            act.retiroBasura !== null &&
            act.lavado !== null &&
            act.sanitizacionProducto.trim() !== '' &&
            act.sanitizacionDosis.trim() !== '' &&
            act.responsibleName.trim() !== '' &&
            act.signature !== null &&
            act.supervisorSignature !== null
        );

    return (
        <div className="space-y-6">
            <header className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-2 border-r">
                        <RucarayLogo className="h-12 w-auto" />
                        <p className="font-semibold mt-1 text-center">Packing y Servicios Rucaray</p>
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
                            <span>:RLSEP</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                            <span className="font-semibold">Versión</span>
                            <span>:3</span>
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
                        <Input id="registro-date" type="date" className="w-full md:w-1/3" value={registroDate} onChange={e => setRegistroDate(e.target.value)} />
                    </div>

                    {/* Responsive Grid Header (visible on md screens and up) */}
                    <div className="hidden md:grid md:grid-cols-[1fr_80px_80px_1fr_1fr_1fr_1.5fr_1fr_1.5fr_auto] gap-4 items-center p-2 font-semibold text-sm text-muted-foreground border-b mb-4">
                        <div className="text-center">Sector</div>
                        <div className="text-center">Retiro Basura</div>
                        <div className="text-center">Lavado</div>
                        <div className="text-center">Producto Sanit.</div>
                        <div className="text-center">Dosis Sanit.</div>
                        <div className="text-center">Responsable</div>
                        <div className="text-center">Firma Responsable</div>
                        <div className="text-center">Observación</div>
                        <div className="text-center">V°B° Supervisor</div>
                        <div className="w-8"></div>
                    </div>

                    {/* Activities List */}
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={activity.id} className="grid grid-cols-1 md:grid-cols-[1fr_80px_80px_1fr_1fr_1fr_1.5fr_1fr_1.5fr_auto] gap-4 md:gap-2 items-start p-4 border rounded-lg md:p-2 md:border-0 md:border-b">

                                {/* Sector */}
                                <div className="grid grid-cols-2 md:block gap-2">
                                    <Label htmlFor={`sector-${activity.id}`} className="font-semibold md:hidden">Sector</Label>
                                    <Input id={`sector-${activity.id}`} placeholder="Ej: Packing" value={activity.sector} onChange={e => handleActivityChange(activity.id, 'sector', e.target.value)} />
                                </div>

                                {/* Retiro Basura */}
                                <div className="grid grid-cols-2 md:flex md:flex-col md:items-center gap-2">
                                    <Label className="font-semibold md:hidden">Retiro Basura</Label>
                                    <RadioGroup value={activity.retiroBasura ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'retiroBasura', val)} className="flex gap-4 justify-start md:justify-center">
                                        <div className="flex items-center space-x-1"><RadioGroupItem value="si" id={`retiro-si-${activity.id}`} /><Label htmlFor={`retiro-si-${activity.id}`}>Si</Label></div>
                                        <div className="flex items-center space-x-1"><RadioGroupItem value="no" id={`retiro-no-${activity.id}`} /><Label htmlFor={`retiro-no-${activity.id}`}>No</Label></div>
                                    </RadioGroup>
                                </div>

                                {/* Lavado */}
                                <div className="grid grid-cols-2 md:flex md:flex-col md:items-center gap-2">
                                    <Label className="font-semibold md:hidden">Lavado</Label>
                                    <RadioGroup value={activity.lavado ?? ""} onValueChange={(val) => handleActivityChange(activity.id, 'lavado', val)} className="flex gap-4 justify-start md:justify-center">
                                        <div className="flex items-center space-x-1"><RadioGroupItem value="si" id={`lavado-si-${activity.id}`} /><Label htmlFor={`lavado-si-${activity.id}`}>Si</Label></div>
                                        <div className="flex items-center space-x-1"><RadioGroupItem value="no" id={`lavado-no-${activity.id}`} /><Label htmlFor={`lavado-no-${activity.id}`}>No</Label></div>
                                    </RadioGroup>
                                </div>

                                {/* Sanitización Producto */}
                                <div className="grid grid-cols-2 md:block gap-2">
                                    <Label htmlFor={`sanit-prod-${activity.id}`} className="font-semibold md:hidden">Producto Sanit.</Label>
                                    <Input id={`sanit-prod-${activity.id}`} placeholder="Producto" value={activity.sanitizacionProducto} onChange={e => handleActivityChange(activity.id, 'sanitizacionProducto', e.target.value)} />
                                </div>

                                {/* Sanitización Dosis */}
                                <div className="grid grid-cols-2 md:block gap-2">
                                    <Label htmlFor={`sanit-dosis-${activity.id}`} className="font-semibold md:hidden">Dosis Sanit.</Label>
                                    <Input id={`sanit-dosis-${activity.id}`} placeholder="Dosis" value={activity.sanitizacionDosis} onChange={e => handleActivityChange(activity.id, 'sanitizacionDosis', e.target.value)} />
                                </div>

                                {/* Nombre Responsable */}
                                <div className="grid grid-cols-2 md:block gap-2">
                                    <Label htmlFor={`resp-name-${activity.id}`} className="font-semibold md:hidden">Responsable</Label>
                                    <Input id={`resp-name-${activity.id}`} placeholder="Nombre" value={activity.responsibleName} onChange={e => handleActivityChange(activity.id, 'responsibleName', e.target.value)} />
                                    _</div>

                                {/* Firma Responsable */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label className="font-semibold md:hidden">Firma Responsable</Label>
                                    <SignaturePad signatureUrl={activity.signature} onSave={(sig) => handleSaveSignature(sig, 'activityResponsible', activity.id)} onDelete={() => {}} canEdit={true} simple />
                                </div>

                                {/* Observacion */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor={`obs-${activity.id}`} className="font-semibold md:hidden">Observación</Label>
                                    <Textarea id={`obs-${activity.id}`} placeholder="Observaciones..." value={activity.observation} onChange={e => handleActivityChange(activity.id, 'observation', e.target.value)} className="min-h-[60px]" />
                                </div>

                                {/* V°B° Supervisor */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label className="font-semibold md:hidden">V°B° Supervisor</Label>
                                    <SignaturePad signatureUrl={activity.supervisorSignature} onSave={(sig) => handleSaveSignature(sig, 'activitySupervisor', activity.id)} onDelete={() => {}} canEdit={true} simple />
                                </div>

                                {/* Acciones */}
                                <div className="flex items-center justify-end md:justify-center">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(activity.id)} disabled={activities.length <= 1}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
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
                        <SignaturePad signatureUrl={elaboradorSignature} onSave={(sig) => handleSaveSignature(sig, 'elaborador')} onDelete={() => setElaboradorSignature(null)} canEdit={true} />
                    </div>
                    <div>
                        <h4 className="font-medium text-center mb-2">Firma Aprobador (Jefe de Operaciones)</h4>
                        <SignaturePad signatureUrl={jefeSignature} onSave={(sig) => handleSaveSignature(sig, 'jefe')} onDelete={() => setJefeSignature(null)} canEdit={true} />
                    </div>
                </CardContent>
            </Card>

            <Card as="footer">
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

    