export type UserRole = 'admin' | 'encargada' | 'jefe' | 'supervisor' | 'trabajador' | 'guest';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  requiredSignatures: UserRole[];
  active: boolean;
}

export interface Signature {
  signedBy: string; // user display name
  role: UserRole;
  signatureUrl: string;
  signedAt: Date;
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
}

export type CertificationStatus = 'pendiente' | 'en progreso' | 'completado' | 'rechazado';

export interface CertificationRecord {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  responsible: string; // user display name
  status: CertificationStatus;
  createdAt: Date;
  updatedAt: Date;
  signatures: Signature[];
  attachments: Attachment[];
}
