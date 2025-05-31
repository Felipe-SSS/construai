"use client";

import { useState, useEffect, useCallback } from "react";
import type { LatLngLiteral } from "google-maps";
import MapView from "@/components/map-view";
import SidebarControls from "@/components/sidebar-controls";
import { identifyUrbanZone } from "@/ai/flows/identify-urban-zone";
import type { IdentifyUrbanZoneOutput } from "@/ai/flows/identify-urban-zone";
import { generateProjectSuitabilityReport } from "@/ai/flows/generate-project-suitability-report";
import type { GenerateProjectSuitabilityReportOutput } from "@/ai/flows/generate-project-suitability-report";
import { useToast } from "@/hooks/use-toast";

const POUSO_ALEGRE_CENTER: LatLngLiteral = { lat: -22.2287, lng: -45.9359 };
const INITIAL_ZOOM = 14;
const PROJECT_TYPES = [
  "Residencial Unifamiliar",
  "Residencial Multifamiliar",
  "Comercial",
  "Industrial",
  "Serviços",
  "Misto",
];

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<LatLngLiteral | null>(null);
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);
  const [urbanZoneInfo, setUrbanZoneInfo] = useState<IdentifyUrbanZoneOutput | null>(null);
  const [suitabilityReport, setSuitabilityReport] = useState<string | null>(null);
  
  const [isLoadingZone, setIsLoadingZone] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setSelectedPoint({ lat, lng });
    setUrbanZoneInfo(null);
    setSuitabilityReport(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (selectedPoint) {
      const fetchUrbanZone = async () => {
        setIsLoadingZone(true);
        setError(null);
        try {
          const result = await identifyUrbanZone({
            latitude: selectedPoint.lat,
            longitude: selectedPoint.lng,
          });
          setUrbanZoneInfo(result);
          toast({
            title: "Zona Urbana Identificada",
            description: `Zona: ${result.urbanZone}`,
          });
        } catch (e) {
          console.error("Error identifying urban zone:", e);
          const errorMessage = e instanceof Error ? e.message : "Falha ao identificar zona urbana.";
          setError(errorMessage);
          toast({
            variant: "destructive",
            title: "Erro",
            description: errorMessage,
          });
        } finally {
          setIsLoadingZone(false);
        }
      };
      fetchUrbanZone();
    }
  }, [selectedPoint, toast]);

  const handleGenerateReport = useCallback(async () => {
    if (!selectedPoint || !projectType || !urbanZoneInfo?.urbanZone) {
      setError("Selecione um ponto no mapa, um tipo de projeto e aguarde a identificação da zona urbana.");
      toast({
        variant: "destructive",
        title: "Informação Incompleta",
        description: "Por favor, complete todas as seleções antes de gerar o relatório.",
      });
      return;
    }

    setIsLoadingReport(true);
    setError(null);
    setSuitabilityReport(null); 
    try {
      const result = await generateProjectSuitabilityReport({
        latitude: selectedPoint.lat,
        longitude: selectedPoint.lng,
        projectType: projectType,
        urbanZone: urbanZoneInfo.urbanZone,
      });
      setSuitabilityReport(result.report);
      toast({
        title: "Relatório Gerado",
        description: "O relatório de viabilidade foi gerado com sucesso.",
      });
    } catch (e) {
      console.error("Error generating report:", e);
      const errorMessage = e instanceof Error ? e.message : "Falha ao gerar relatório.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erro",
        description: errorMessage,
      });
    } finally {
      setIsLoadingReport(false);
    }
  }, [selectedPoint, projectType, urbanZoneInfo, toast]);
  
  const isReportButtonDisabled = !selectedPoint || !projectType || !urbanZoneInfo?.urbanZone || isLoadingZone || isLoadingReport;

  return (
    <main className="flex h-screen w-screen flex-col p-4 lg:flex-row lg:space-x-4 bg-background">
      <div className="flex-grow h-1/2 lg:h-full lg:w-2/3 mb-4 lg:mb-0">
        <MapView
          apiKey={googleMapsApiKey}
          center={POUSO_ALEGRE_CENTER}
          zoom={INITIAL_ZOOM}
          onMapClick={handleMapClick}
          selectedPoint={selectedPoint}
        />
      </div>
      <div className="h-1/2 lg:h-full lg:w-1/3">
        <SidebarControls
          projectTypes={PROJECT_TYPES}
          selectedProjectType={projectType}
          onProjectTypeChange={setProjectType}
          onGenerateReport={handleGenerateReport}
          selectedPoint={selectedPoint}
          urbanZoneInfo={urbanZoneInfo}
          suitabilityReport={suitabilityReport}
          isLoadingZone={isLoadingZone}
          isLoadingReport={isLoadingReport}
          error={error}
          isReportButtonDisabled={isReportButtonDisabled}
        />
      </div>
    </main>
  );
}
