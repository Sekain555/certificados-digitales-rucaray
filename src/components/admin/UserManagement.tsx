
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockUsers = [
    { id: 1, name: 'Admin Rucaray', email: 'admin@rucaray.cl', role: 'admin', status: 'Activo' },
    { id: 2, name: 'Supervisor de Calidad', email: 'supervisor@rucaray.cl', role: 'supervisor', status: 'Activo' },
    { id: 3, name: 'Juan Trabajador', email: 'trabajador@rucaray.cl', role: 'trabajador', status: 'Inactivo' },
    { id: 4, name: 'Jefe de Planta', email: 'jefe@rucaray.cl', role: 'jefe', status: 'Activo' },
];

export function UserManagement() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Gestión de Usuarios</CardTitle>
                        <CardDescription>Crea, edita y gestiona los usuarios del sistema.</CardDescription>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead><span className="sr-only">Acciones</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Activo' ? 'default' : 'outline'}>{user.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
