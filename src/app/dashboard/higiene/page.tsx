
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SignaturePad } from "@/components/certifications/SignaturePad";
import { inspectionItemsBySection } from "@/lib/higiene-data";
import RucarayLogo from "@/components/RucarayLogo";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type ComplianceStatus = "cumple" | "no cumple" | "no aplica";
type SignatureType = 'record' | 'action' | 'verification';

interface ItemState {
  compliance: ComplianceStatus;
  notes: string;
}

export default function HigieneInspectionPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [inspectionDate, setInspectionDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [recordResponsible, setRecordResponsible] = useState('');
  const [actionResponsible, setActionResponsible] = useState('');
  const [verificationResponsible, setVerificationResponsible] = useState('');

  const [recordSignature, setRecordSignature] = useState<string | null>(null);
  const [actionSignature, setActionSignature] = useState<string | null>(null);
  const [verificationSignature, setVerificationSignature] = useState<string | null>(null);

  const [itemStates, setItemStates] = useState<Record<string, ItemState>>(
    () => {
      const initialState: Record<string, ItemState> = {};
      Object.values(inspectionItemsBySection)
        .flat()
        .forEach((item) => {
          initialState[item.id] = { compliance: "no aplica", notes: "" };
        });
      return initialState;
    }
  );

  useEffect(() => {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const localDateString = `${year}-${month}-${day}`;
    
    setInspectionDate(localDateString);

    const santiagoTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Santiago'
    }).format(now);
    
    setStartTime(santiagoTime);
    setEndTime(santiagoTime);
  }, []);
  
  const hasHighPrivileges = user?.role === 'admin' || user?.role === 'jefe' || user?.role === 'supervisor';

  const handleComplianceChange = (
    itemId: string,
    value: ComplianceStatus
  ) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], compliance: value },
    }));
  };

  const handleNotesChange = (itemId: string, value: string) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], notes: value },
    }));
  };

  const handleSaveSignature = (signature: string, type: SignatureType) => {
    switch (type) {
      case 'record':
        setRecordSignature(signature);
        break;
      case 'action':
        setActionSignature(signature);
        break;
      case 'verification':
        setVerificationSignature(signature);
        break;
    }
    console.log(`Saving ${type} signature...`);
    toast({
      title: "Firma guardada",
      description: "La firma se ha añadido al registro.",
    });
  };

  const handleDeleteSignature = (type: SignatureType) => {
     switch (type) {
      case 'record':
        setRecordSignature(null);
        break;
      case 'action':
        setActionSignature(null);
        break;
      case 'verification':
        setVerificationSignature(null);
        break;
    }
    toast({
      title: "Firma eliminada",
      variant: "destructive"
    });
  }

  const isFormComplete = 
    recordResponsible.trim() !== '' &&
    actionResponsible.trim() !== '' &&
    verificationResponsible.trim() !== '' &&
    recordSignature !== null &&
    actionSignature !== null &&
    verificationSignature !== null;

  return (
    <div className="space-y-6">
       <header className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center justify-center p-2 border-r">
            <RucarayLogo className="h-12 w-auto" />
            <p className="font-semibold mt-1 text-center">Packing y Servicios Rucaray</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <p className="font-semibold">Sistema de Gestión</p>
            <h1 className="text-lg font-bold font-headline mt-2 text-primary">
              REGISTRO DE INSPECCIÓN DE HIGIENE
            </h1>
          </div>
          <div className="text-sm p-2">
              <div className="grid grid-cols-[auto_1fr] gap-x-2 border-b">
                  <span className="font-semibold">Codigo</span>
                  <span>:RIH</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-2">
                  <span className="font-semibold">Versión</span>
                  <span>:5</span>
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
            <Label htmlFor="inspection-date">Fecha de Inspección</Label>
            <Input id="inspection-date" type="date" value={inspectionDate} onChange={(e) => setInspectionDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start-time">Hora de Inicio</Label>
            <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">Hora de Término</Label>
            <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="record-responsible">Responsable Registro</Label>
            <Input id="record-responsible" placeholder="Nombre completo" value={recordResponsible} onChange={(e) => setRecordResponsible(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="action-responsible">Responsable Acción Correctiva</Label>
            <Input id="action-responsible" placeholder="Nombre completo" value={actionResponsible} onChange={(e) => setActionResponsible(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verification-responsible">Responsable de Verificación</Label>
            <Input id="verification-responsible" placeholder="Nombre completo" value={verificationResponsible} onChange={(e) => setVerificationResponsible(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ítems de Inspección</CardTitle>
          <CardDescription>
            Marque el estado de cumplimiento para cada requisito.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={Object.keys(inspectionItemsBySection)} className="w-full">
            {Object.entries(inspectionItemsBySection).map(
              ([section, items]) => (
                <AccordionItem key={section} value={section}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline bg-muted/50 px-4 rounded-md">
                    {section}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50%]">Ítem / Requisito</TableHead>
                          <TableHead className="text-center w-[20%]">Cumplimiento</TableHead>
                          <TableHead className="w-[30%]">Acción Correctiva / Observaciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.requirement}
                            </TableCell>
                            <TableCell className="text-center">
                              <RadioGroup
                                value={itemStates[item.id]?.compliance}
                                onValueChange={(value) =>
                                  handleComplianceChange(
                                    item.id,
                                    value as ComplianceStatus
                                  )
                                }
                                className="flex justify-center gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="cumple" id={`${item.id}-cumple`} />
                                  <Label htmlFor={`${item.id}-cumple`}>C</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no cumple" id={`${item.id}-no-cumple`} />
                                  <Label htmlFor={`${item.id}-no-cumple`}>NC</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no aplica" id={`${item.id}-no-aplica`} />
                                  <Label htmlFor={`${item.id}-no-aplica`}>NA</Label>
                                </div>
                              </RadioGroup>
                            </TableCell>
                            <TableCell>
                              <Textarea
                                placeholder="Anotar observaciones..."
                                value={itemStates[item.id]?.notes}
                                onChange={(e) => handleNotesChange(item.id, e.target.value) }
                                className="min-h-[40px]"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Firmas de Responsables</CardTitle>
            <CardDescription>Las firmas son requeridas para validar y completar el registro.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-8">
            <div>
                <h4 className="font-medium text-center mb-2">Firma Responsable Registro</h4>
                <SignaturePad 
                    signatureUrl={recordSignature}
                    onSave={(sig) => handleSaveSignature(sig, 'record')} 
                    onDelete={() => handleDeleteSignature('record')}
                    canEdit={hasHighPrivileges}
                />
            </div>
            <div>
                <h4 className="font-medium text-center mb-2">Firma Responsable Acción Correctiva</h4>
                 <SignaturePad 
                    signatureUrl={actionSignature}
                    onSave={(sig) => handleSaveSignature(sig, 'action')} 
                    onDelete={() => handleDeleteSignature('action')}
                    canEdit={hasHighPrivileges}
                />
            </div>
            <div>
                <h4 className="font-medium text-center mb-2">Firma Responsable de Verificación</h4>
                 <SignaturePad 
                    signatureUrl={verificationSignature}
                    onSave={(sig) => handleSaveSignature(sig, 'verification')} 
                    onDelete={() => handleDeleteSignature('verification')}
                    canEdit={hasHighPrivileges}
                />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button variant="outline">Guardar como borrador</Button>
        <Button className="bg-green-600 hover:bg-green-700" disabled={!isFormComplete}>Enviar Registro</Button>
        <Button variant="secondary" disabled={!isFormComplete}>Descargar PDF</Button>
      </div>
    </div>
  );
}
