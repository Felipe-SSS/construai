"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, MapPin, FileText, CheckCircle2 } from "lucide-react";
import type { LatLngLiteral } from "google-maps";
import { LarguraInput } from "@/components/ui/inputlargura";
import { AlturaInput } from "./ui/inputaltura";
import { ComprimentoInput } from "./ui/inputcomprimento";



interface SidebarControlsProps {
  projectTypes: string[];
  selectedProjectType: string;
  quartos: string[];
  setQuartos: string;
  onProjectTypeChange: (type: string) => void;
  onGenerateReport: () => void;
  selectedPoint: LatLngLiteral | null;
  urbanZoneInfo: { urbanZone: string; confidence: number } | null;
  suitabilityReport: string | null;
  isLoadingZone: boolean;
  isLoadingReport: boolean;
  error: string | null;
  isReportButtonDisabled: boolean;
}

export default function SidebarControls({
  projectTypes,
  selectedProjectType,
  quartos,
  setQuartos,
  onProjectTypeChange,
  onGenerateReport,
  selectedPoint,
  urbanZoneInfo,
  suitabilityReport,
  isLoadingZone,
  isLoadingReport,
  error,
  isReportButtonDisabled,
}: SidebarControlsProps) {
  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-y-auto rounded-lg bg-card p-6 shadow-lg">
      <h2 className="font-headline text-2xl font-semibold text-primary">Constru.AI</h2>
      
      <div className="space-y-2">
        <Label htmlFor="project-type" className="text-sm font-medium">Tipo de Projeto</Label>
        <Select value={selectedProjectType ?? ""} onValueChange={onProjectTypeChange}>
          <SelectTrigger id="project-type" className="w-full">
            <SelectValue placeholder="Selecione o tipo de projeto" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 👇 Caixinha nova que aparece só quando "Residencial Unifamiliar" está selecionado */}
      
      
      {selectedProjectType === "Residencial Unifamiliar" && (
        <div className="space-y-2">
          <Label htmlFor="quartos" className="text-sm font-medium">
            Número de Quartos
          </Label>
          <Select value={quartos} onValueChange={setQuartos}>
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
      )}

      
      <div className="space-y-6">
        <LarguraInput />
      </div>

      <div className="space-y-10">
        <AlturaInput />
      </div>

      <div className="space-y-14">
        <ComprimentoInput />
      </div>

              <Button
        onClick={onGenerateReport}
        disabled={isReportButtonDisabled}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isLoadingReport ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Analisar viabilidade
      </Button>  

      <Button
        onClick={onGenerateReport}
        disabled={isReportButtonDisabled}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isLoadingReport ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Criar Relatório
      </Button>


      <Separator />

      {selectedPoint && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> Ponto Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Latitude: {selectedPoint.lat.toFixed(6)}</p>
            <p>Longitude: {selectedPoint.lng.toFixed(6)}</p>
          </CardContent>
        </Card>
      )}

      {isLoadingZone && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Identificando zona urbana...</span>
        </div>
      )}

      {urbanZoneInfo && !isLoadingZone && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" /> Zona Urbana Identificada
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Zona: <span className="font-semibold">{urbanZoneInfo.urbanZone}</span></p>
          </CardContent>
        </Card>
      )}
      
      {isLoadingReport && (
         <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Gerando relatório...</span>
        </div>
      )}

      {suitabilityReport && !isLoadingReport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <FileText className="mr-2 h-5 w-5 text-primary" /> Relatório de Viabilidade
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-sm">
            <p>{suitabilityReport}</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
