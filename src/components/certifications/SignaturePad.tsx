
"use client";

import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Save, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SignaturePadProps {
  signatureUrl?: string | null;
  onSave: (signature: string) => void;
  onDelete: () => void;
  canEdit: boolean;
  simple?: boolean;
}

export function SignaturePad({ signatureUrl, onSave, onDelete, canEdit, simple = false }: SignaturePadProps) {
  const sigPad = useRef<SignatureCanvas>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // If a signature URL is provided, we are not in editing mode initially
    if (signatureUrl) {
      setIsEditing(false);
    } else {
      // If there is no signature, force editing mode
      setIsEditing(true);
    }
  }, [signatureUrl]);

  const clear = () => {
    sigPad.current?.clear();
    setIsSigned(false);
  };

  const save = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
      onSave(dataUrl);
      setIsEditing(false); // Exit editing mode after saving
    }
  };
  
  const handleDraw = () => {
    if (sigPad.current) {
        setIsSigned(!sigPad.current.isEmpty());
    }
  }

  const handleEdit = () => {
    if (canEdit) {
      setIsEditing(true);
      // Ensure the canvas is cleared for a new signature if one already exists
      if (signatureUrl) {
        setTimeout(() => clear(), 0);
      }
    }
  };
  
  const canvasHeight = simple ? "aspect-video w-full" : "h-48";
  const buttonSize = simple ? "sm" : "default";
  const textSize = simple ? "text-xs" : "text-sm";

  if (!isEditing && signatureUrl) {
    return (
      <div className="w-full space-y-2">
        <div className={cn("relative rounded-lg border bg-white group", canvasHeight)}>
          <Image
            src={signatureUrl}
            alt="Firma guardada"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-md"
          />
        </div>
        {canEdit && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size={buttonSize} onClick={handleEdit} className={textSize}>
              <Pencil className="mr-1 h-3 w-3" />
              Editar
            </Button>
            <Button variant="destructive" size={buttonSize} onClick={onDelete} className={textSize}>
                <Trash2 className="mr-1 h-3 w-3" />
                Eliminar
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Only render the signature pad if canEdit is true
  if (!canEdit) {
    return (
      <div className={cn("rounded-lg border bg-muted/50 flex items-center justify-center", canvasHeight)}>
        <p className="text-sm text-muted-foreground">Firma pendiente</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-2">
      <div className={cn("rounded-lg border bg-white", canvasHeight)}>
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{ className: "w-full h-full rounded-md" }}
            onEnd={handleDraw}
          />
      </div>
      <div className="flex justify-end gap-2">
          {signatureUrl && !simple && (
            <Button variant="ghost" size={buttonSize} onClick={() => setIsEditing(false)} className={textSize}>
              <X className="mr-1 h-3 w-3" />
              Cancelar
            </Button>
          )}
          <Button variant="outline" size={buttonSize} onClick={clear} disabled={!isSigned} className={textSize}>
              <Eraser className="mr-1 h-3 w-3" />
              Limpiar
          </Button>
          <Button size={buttonSize} onClick={save} disabled={!isSigned} className={cn("bg-green-600 hover:bg-green-700", textSize)}>
              <Save className="mr-1 h-3 w-3" />
              Guardar
          </Button>
      </div>
    </div>
  );
}
