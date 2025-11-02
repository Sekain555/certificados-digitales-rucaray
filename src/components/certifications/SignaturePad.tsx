
"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  onSave: (signature: string) => void;
  simple?: boolean; // New prop for a more compact version
}

export function SignaturePad({ onSave, simple = false }: SignaturePadProps) {
  const sigPad = useRef<SignatureCanvas>(null);
  const [isSigned, setIsSigned] = useState(false);

  const clear = () => {
    sigPad.current?.clear();
    setIsSigned(false);
  };

  const save = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
      onSave(dataUrl);
      clear();
    }
  };
  
  const handleDraw = () => {
    if (sigPad.current) {
        setIsSigned(!sigPad.current.isEmpty());
    }
  }
  
  const canvasHeight = simple ? "aspect-video w-full" : "h-48";

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
