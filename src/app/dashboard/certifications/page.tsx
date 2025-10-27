import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CertificationRecord, CertificationStatus } from "@/lib/types";

const mockCertifications: CertificationRecord[] = [
    { id: 'cert1', title: 'Inducción de Seguridad para Nuevos Empleados', description: '', categoryId: 'seguridad', responsible: 'user1', status: 'completado', createdAt: new Date('2023-10-01'), updatedAt: new Date(), signatures: [], attachments: [] },
    { id: 'cert2', title: 'Uso de Extintores', description: '', categoryId: 'seguridad', responsible: 'user2', status: 'en progreso', createdAt: new Date('2023-10-05'), updatedAt: new Date(), signatures: [], attachments: [] },
    { id: 'cert3', title: 'Control de Calidad - Lote 34A', description: '', categoryId: 'calidad', responsible: 'user3', status: 'pendiente', createdAt: new Date('2023-10-10'), updatedAt: new Date(), signatures: [], attachments: [] },
    { id: 'cert4', title: 'Mantenimiento Preventivo de Máquina 2', description: '', categoryId: 'produccion', responsible: 'user4', status: 'completado', createdAt: new Date('2023-09-28'), updatedAt: new Date(), signatures: [], attachments: [] },
];

const statusVariant: { [key in CertificationStatus]: "default" | "secondary" | "outline" | "destructive" } = {
    completado: "default",
    'en progreso': "secondary",
    pendiente: "outline",
    rechazado: "destructive"
};


export default function CertificationsPage() {
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Certificaciones</h1>
            <p className="text-muted-foreground">
                Gestiona todos los registros de certificaciones.
            </p>
         </div>
         <Button asChild>
            <Link href="/dashboard/certifications/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Registro
            </Link>
         </Button>
       </div>
        <Card>
            <CardHeader>
                <CardTitle>Registros Recientes</CardTitle>
                <CardDescription>
                Una lista de las certificaciones más recientes en el sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead>
                        <span className="sr-only">Acciones</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCertifications.map((cert) => (
                    <TableRow key={cert.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                            <Link href={`/dashboard/certifications/${cert.id}`} className="hover:underline">
                                {cert.title}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[cert.status]}>{cert.status}</Badge>
                        </TableCell>
                        <TableCell>{cert.responsible}</TableCell>
                        <TableCell>{cert.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                           <Button asChild variant="outline" size="sm">
                                <Link href={`/dashboard/certifications/${cert.id}`}>Ver</Link>
                           </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
