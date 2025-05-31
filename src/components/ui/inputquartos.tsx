// components/InputQuartos.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface InputQuartosProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputQuartos({ value, onChange }: InputQuartosProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="quartos" className="text-sm font-medium">
        Número de Quartos
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="quartos" className="w-full">
          <SelectValue placeholder="Escolha o número de quartos" />
        </SelectTrigger>
        <SelectContent>
          {[2, 3, 4, 5].map((q) => (
            <SelectItem key={q} value={String(q)}>
              {q} quartos
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
