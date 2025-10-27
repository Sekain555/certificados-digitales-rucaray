"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Paperclip, User, Calendar, Printer } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CertificationRecord, CertificationStatus } from "@/lib/types";
import { SignaturePad } from "@/components/certifications/SignaturePad";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import Image from "next/image";

const mockCertification: CertificationRecord = {
    id: 'cert2',
    title: 'Uso de Extintores',
    description: 'Capacitación sobre el uso correcto de extintores de incendios tipo ABC, CO2 y PQS. Incluye demostración práctica y evaluación teórica.',
    categoryId: 'seguridad',
    responsible: 'Juan Pérez',
    status: 'en progreso',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date(),
    signatures: [
        { signedBy: 'Laura Nuñez', role: 'supervisor', signatureUrl: 'https://picsum.photos/seed/sig1/200/100', signedAt: new Date('2023-10-06') }
    ],
    attachments: [
        { name: 'Manual de Extintores.pdf', url: '#', type: 'application/pdf' },
        { name: 'Foto de la Práctica.jpg', url: '#', type: 'image/jpeg' }
    ],
};

const statusVariant: { [key in CertificationStatus]: "default" | "secondary" | "outline" | "destructive" } = {
    completado: "default",
    'en progreso': "secondary",
    pendiente: "outline",
    rechazado: "destructive"
};

export default function CertificationDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id;
  const certification = mockCertification;

  const handleSaveSignature = (signature: string) => {
    console.log("Saving signature...", signature.substring(0, 40) + "...");
    toast({
        title: "Firma guardada",
        description: "La firma se ha añadido al registro.",
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Certificación Rucaray Digital", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(certification.title, 20, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`ID: ${certification.id}`, 20, 50);
    doc.text(`Estado: ${certification.status}`, 20, 57);
    doc.text(`Responsable: ${certification.responsible}`, 20, 64);
    doc.text(`Fecha: ${certification.createdAt.toLocaleDateString()}`, 20, 71);

    doc.setFont("helvetica", "bold");
    doc.text("Descripción:", 20, 85);
    doc.setFont("helvetica", "normal");
    const descriptionLines = doc.splitTextToSize(certification.description, 170);
    doc.text(descriptionLines, 20, 92);
    
    if (certification.signatures.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Firmas:", 20, 150);
        doc.setFont("helvetica", "normal");
        certification.signatures.forEach((sig, index) => {
            doc.text(`${sig.signedBy} (${sig.role}) - ${sig.signedAt.toLocaleDateString()}`, 20, 160 + (index * 10));
            // Note: Adding images to jsPDF requires more complex handling, like converting them to data URIs first.
            // This is a simplified example.
        });
    }

    doc.save(`certificacion-${certification.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/certifications">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
          {certification.title}
        </h1>
        <Badge variant={statusVariant[certification.status]} className="ml-auto sm:ml-0">
          {certification.status}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Descartar
          </Button>
          <Button size="sm" onClick={generatePDF}>
            <Printer className="mr-2 h-4 w-4" />
            Generar PDF
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr] lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Detalles del Registro</CardTitle>
                    <CardDescription>{certification.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <strong>Responsable:</strong><span>{certification.responsible}</span>
                    </div>
                     <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <strong>Fecha de Creación:</strong><span>{certification.createdAt.toLocaleDateString()}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Firmas Registradas</CardTitle>
                </CardHeader>
                <CardContent>
                    {certification.signatures.length > 0 ? (
                        <div className="grid gap-4">
                            {certification.signatures.map((sig, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Image src={sig.signatureUrl} alt={`Firma de ${sig.signedBy}`} width={100} height={50} className="rounded-md bg-muted" data-ai-hint="signature" />
                                        <div>
                                            <p className="font-medium">{sig.signedBy}</p>
                                            <p className="text-sm text-muted-foreground">{sig.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{sig.signedAt.toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Aún no hay firmas en este registro.</p>
                    )}
                </CardContent>
            </Card>

            <SignaturePad onSave={handleSaveSignature} />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Archivos Adjuntos</CardTitle>
            </CardHeader>
            <CardContent>
                {certification.attachments.length > 0 ? (
                    <ul className="grid gap-3">
                        {certification.attachments.map((file, i) => (
                            <li key={i} className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm font-medium">
                                    <Paperclip className="h-4 w-4" />
                                    {file.name}
                                </span>
                                <Button size="icon" variant="outline" asChild>
                                    <a href={file.url} download>
                                        <Download className="h-4 w-4" />
                                    </a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                     <p className="text-sm text-muted-foreground">No hay archivos adjuntos.</p>
                )}
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                    <Paperclip className="mr-2 h-4 w-4" /> Subir Archivo
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
