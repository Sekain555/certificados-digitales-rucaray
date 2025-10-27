# **App Name**: Certificaciones Rucaray Digital

## Core Features:

- Firebase Authentication: User authentication and role management using Firebase Auth with custom claims to manage access based on user roles (admin, encargada, jefe, supervisor, trabajador).
- Category Management: Create, edit, and manage certification categories (e.g., Seguridad, Producción, Calidad). Categories are stored as documents in Firestore and contain name, color, required signatures, and active status fields.
- Record Management: Create, update, and manage certification records within each category. Records store data like title, description, responsible party, status, digital signatures, and attachments, saved in Firestore.
- Digital Signatures: Capture digital signatures using a canvas-based signature pad (SignaturePad or react-signature-canvas). Store signature images within the record in Firestore.
- File Uploads: Upload multimedia attachments (images, documents) to Firebase Storage. Store file URLs and metadata within the associated certification record in Firestore.
- PDF Generation: Generate PDF documents from certification records using jsPDF or pdf-lib. PDFs can be downloaded or printed directly from the application.

## Style Guidelines:

- Primary color: Rucaray Blue (#002A5C) to establish a strong corporate identity.
- Background color: Light gray (#F4F5F7) for light mode and dark gray (#101418) for dark mode, providing comfortable contrast and legibility.
- Accent color: Yellow (#FFD200) to draw attention to key interactive elements.
- Body and headline font: 'Poppins' (sans-serif) for a modern, clean, and readable aesthetic. Note: currently only Google Fonts are supported.
- Retractable sidebar with large, sticker-style icons for easy navigation, especially on tablets.
- Fixed top bar displaying the Rucaray logo and system name for consistent branding.
- Rounded borders (12px) and subtle box shadows ('hover-elevate') for a modern, tactile feel.