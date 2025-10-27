"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eraser, Save } from "lucide-react";

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export function SignaturePad({ onSave }: SignaturePadProps) {
  const sigPad = useRef<SignatureCanvas>(null);
  const [isSigned, setIsSigned] = useState(false);

  const clear = () => {
    sigPad.current?.clear();
    setIsSigned(false);
  };

  const save = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
      onSave(dataUrl);
      clear();
    }
  };
  
  const handleDraw = () => {
    setIsSigned(!sigPad.current?.isEmpty() ?? false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Firma Digital</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-background">
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{ className: "w-full h-48 rounded-md" }}
            onEnd={handleDraw}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={clear} disabled={!isSigned}>
            <Eraser className="mr-2 h-4 w-4" />
            Limpiar
        </Button>
        <Button onClick={save} disabled={!isSigned}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Firma
        </Button>
      </CardFooter>
    </Card>
  );
}
