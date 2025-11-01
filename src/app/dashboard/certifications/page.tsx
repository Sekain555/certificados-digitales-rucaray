
"use client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Search, FileDown } from "lucide-react";
import { CertificationRecord, CertificationStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const mockCertifications: CertificationRecord[] = [];

const statusVariant: { [key in CertificationStatus]: "default" | "secondary" | "outline" | "destructive" } = {
    completado: "default",
    'en progreso': "secondary",
    pendiente: "outline",
    rechazado: "destructive"
};

const categoryLabels: { [key: string]: string } = {
    seguridad: 'Seguridad',
    calidad: 'Calidad',
    produccion: 'Producción',
    logistica: 'Logística',
};


export default function CertificationsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Historial de Registros</h1>
            <p className="text-muted-foreground">
                Consulta, filtra y gestiona todos los registros de certificaciones.
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
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por título o responsable..."
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="completado">Completado</SelectItem>
                      <SelectItem value="en progreso">En Progreso</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="rechazado">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                   <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="seguridad">Seguridad</SelectItem>
                      <SelectItem value="produccion">Producción</SelectItem>
                      <SelectItem value="calidad">Calidad</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="ml-auto w-full md:w-auto">
                    <FileDown className="mr-2 h-4 w-4"/>
                    Exportar
                  </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead>
                        <span className="sr-only">Acciones</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCertifications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No hay registros disponibles.
                        </TableCell>
                      </TableRow>
                    ) : (
                      mockCertifications.map((cert) => (
                      <TableRow key={cert.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium max-w-xs truncate">
                              <Link href={`/dashboard/certifications/${cert.id}`} className="hover:underline">
                                  {cert.title}
                              </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{categoryLabels[cert.categoryId] || 'Desconocida'}</Badge>
                          </TableCell>
                          <TableCell>
                              <Badge variant={statusVariant[cert.status]}>{cert.status}</Badge>
                          </TableCell>
                          <TableCell>{cert.responsible}</TableCell>
                          <TableCell>{cert.createdAt.toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                      <DropdownMenuItem asChild><Link href={`/dashboard/certifications/${cert.id}`}>Ver Detalles</Link></DropdownMenuItem>
                                      <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                                      <DropdownMenuItem>Imprimir</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                      </TableRow>
                      ))
                    )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
         <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
    </div>
  );
}
