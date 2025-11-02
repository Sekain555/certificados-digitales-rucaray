
"use client";

import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Save, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SignaturePadProps {
  signatureUrl: string | null;
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

  if (!isEditing && signatureUrl) {
    return (
      <div className="w-full space-y-2">
        <div className={cn("relative rounded-lg border bg-white group", canvasHeight)}>
          <Image
            src={signatureUrl}
            alt="Firma guardada"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        {canEdit && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size={simple ? "sm" : "default"} onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar Firma
            </Button>
            <Button variant="destructive" size={simple ? "sm" : "default"} onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
            </Button>
          </div>
        )}
      </div>
    );
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
          {signatureUrl && canEdit && (
            <Button variant="ghost" size={simple ? "sm" : "default"} onClick={() => setIsEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          )}
          <Button variant="outline" size={simple ? "sm" : "default"} onClick={clear} disabled={!isSigned}>
              <Eraser className="mr-2 h-4 w-4" />
              Limpiar
          </Button>
          <Button size={simple ? "sm" : "default"} onClick={save} disabled={!isSigned} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Guardar
          </Button>
      </div>
    </div>
  );
}
