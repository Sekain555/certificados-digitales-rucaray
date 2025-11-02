
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

type ComplianceStatus = "cumple" | "no cumple" | "no aplica";

interface ItemState {
  compliance: ComplianceStatus;
  notes: string;
}

export default function HigieneInspectionPage() {
  const { toast } = useToast();
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().split('T')[0]);
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

  const handleSaveSignature = (signature: string) => {
    console.log("Saving signature...", signature.substring(0, 40) + "...");
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
            <Input id="start-time" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">Hora de Término</Label>
            <Input id="end-time" type="time" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="execution-responsible">Responsable de Ejecución</Label>
            <Input id="execution-responsible" placeholder="Nombre completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verification-responsible">Responsable de Verificación</Label>
            <Input id="verification-responsible" placeholder="Nombre completo" />
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
        <CardContent className="grid md:grid-cols-2 gap-8">
            <SignaturePad onSave={handleSaveSignature} />
            <SignaturePad onSave={handleSaveSignature} />
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button variant="outline">Guardar como borrador</Button>
        <Button className="bg-green-600 hover:bg-green-700">Enviar Registro</Button>
        <Button variant="secondary">Descargar PDF</Button>
      </div>
    </div>
  );
}
