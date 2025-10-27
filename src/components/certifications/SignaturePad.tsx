"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  return (
    <Card className="max-w-2xl mx-auto w-full">
      <CardHeader>
        <CardTitle>Firmar Registro</CardTitle>
        <CardDescription>Dibuja tu firma en el recuadro para validar el registro.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-white">
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
        <Button onClick={save} disabled={!isSigned} className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" />
            Guardar Firma
        </Button>
      </CardFooter>
    </Card>
  );
}
