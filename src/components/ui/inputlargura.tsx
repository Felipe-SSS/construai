// components/LarguraInput.tsx
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function LarguraInput() {
  const [largura, setLargura] = useState("")

  return (
    <div className="space-y-2">
      <Label htmlFor="largura" className="text-sm font-medium">
        Digite a largura (em metros)
      </Label>
      <Input
        id="largura"
        type="number"
        placeholder="Ex: 10"
        value={largura}
        onChange={(e) => setLargura(e.target.value)}
      />
    </div>
  )
}
