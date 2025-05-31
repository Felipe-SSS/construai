"use client";

import type { LatLngLiteral } from "google-maps";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

interface MapViewProps {
  apiKey: string | undefined;
  center: LatLngLiteral;
  zoom: number;
  onMapClick: (lat: number, lng: number) => void;
  selectedPoint: LatLngLiteral | null;
}

export default function MapView({
  apiKey,
  center,
  zoom,
  onMapClick,
  selectedPoint,
}: MapViewProps) {
  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
        <p>Google Maps API Key está ausente. O mapa não pode ser carregado.</p>
      </div>
    );
  }

  const handleMapClickHandler = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      onMapClick(event.detail.latLng.lat, event.detail.latLng.lng);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="pousoAlegreMap"
        onClick={handleMapClickHandler}
        className="h-full w-full rounded-lg shadow-md"
      >
        {selectedPoint && (
          <AdvancedMarker position={selectedPoint}>
            <MapPin className="h-8 w-8 text-primary" />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
}
