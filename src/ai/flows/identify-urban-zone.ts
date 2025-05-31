'use server';

/**
 * @fileOverview This file defines a simulated flow to identify the urban zone of a given coordinate,
 * using randomized but fair distribution logic (no LLM, no real spatial data).
 */

import { z } from 'genkit';

const IdentifyUrbanZoneInputSchema = z.object({
  latitude: z.number().describe('The latitude of the point on the map.'),
  longitude: z.number().describe('The longitude of the point on the map.'),
});
export type IdentifyUrbanZoneInput = z.infer<typeof IdentifyUrbanZoneInputSchema>;

const IdentifyUrbanZoneOutputSchema = z.object({
  urbanZone: z.string().describe('The identified urban zone for the given coordinates.'),});
export type IdentifyUrbanZoneOutput = z.infer<typeof IdentifyUrbanZoneOutputSchema>;

export async function identifyUrbanZone(input: IdentifyUrbanZoneInput): Promise<IdentifyUrbanZoneOutput> {
  return identifyUrbanZoneFlow(input);
}

// Lista de zonas possíveis
const ZONES = ['ZEU', 'ZER', 'ZMV', 'ZM1', 'ZM2', 'ZM3', 'ZM4'];

/**
 * Retorna uma zona urbana aleatória com confiança semi-arbitrária (simulação).
 */
const identifyUrbanZoneFlow = async (
  input: IdentifyUrbanZoneInput
): Promise<IdentifyUrbanZoneOutput> => {
  const randomIndex = Math.floor(Math.random() * ZONES.length);
  const selectedZone = ZONES[randomIndex];

  return {
    urbanZone: selectedZone,
  };
};
