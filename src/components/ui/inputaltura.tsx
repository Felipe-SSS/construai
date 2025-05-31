// components/LarguraInput.tsx
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function AlturaInput() {
  const [altura, setAltura] = useState("")

  return (
    <div className="space-y-2">
      <Label htmlFor="altura" className="text-sm font-medium">
        Digite a altura máxima (em metros)
      </Label>
      <Input
        id="altura"
        type="number"
        placeholder="Ex: 20"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />
    </div>
  )
}
