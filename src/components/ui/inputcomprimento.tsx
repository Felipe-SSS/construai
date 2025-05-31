// components/LarguraInput.tsx
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function ComprimentoInput() {
  const [comprimento, setComprimento] = useState("")

  return (
    <div className="space-y-2">
      <Label htmlFor="comprimento" className="text-sm font-medium">
        Digite o comprimento (em metros)
      </Label>
      <Input
        id="comprimento"
        type="number"
        placeholder="Ex: 15"
        value={comprimento}
        onChange={(e) => setComprimento(e.target.value)}
      />
    </div>
  )
}
