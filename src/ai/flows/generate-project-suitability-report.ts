'use server';

/**
 * @fileOverview Generates a project suitability report based on a selected point on the map and project type.
 *
 * - generateProjectSuitabilityReport - A function that generates the project suitability report.
 * - GenerateProjectSuitabilityReportInput - The input type for the generateProjectSuitabilityReport function.
 * - GenerateProjectSuitabilityReportOutput - The return type for the generateProjectSuitabilityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSuitabilityReportInputSchema = z.object({
  latitude: z.number().describe('The latitude of the selected point.'),
  longitude: z.number().describe('The longitude of the selected point.'),
  projectType: z.string().describe('The type of project to be built (e.g., residential single-family, multi-family).'),
  urbanZone: z.string().describe('The urban zone corresponding to the selected point.'),
});
export type GenerateProjectSuitabilityReportInput = z.infer<typeof GenerateProjectSuitabilityReportInputSchema>;

const GenerateProjectSuitabilityReportOutputSchema = z.object({
  report: z.string().describe('A report summarizing the suitability of the project for the selected zone.'),
});
export type GenerateProjectSuitabilityReportOutput = z.infer<typeof GenerateProjectSuitabilityReportOutputSchema>;

export async function generateProjectSuitabilityReport(input: GenerateProjectSuitabilityReportInput): Promise<GenerateProjectSuitabilityReportOutput> {
  return generateProjectSuitabilityReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectSuitabilityReportPrompt',
  input: {schema: GenerateProjectSuitabilityReportInputSchema},
  output: {schema: GenerateProjectSuitabilityReportOutputSchema},
  prompt: `You are an expert urban planner with extensive knowledge of zoning regulations in Pouso Alegre, MG, Brazil.

You will generate a brief report summarizing the suitability of a given project type for a specific urban zone, based on its latitude and longitude. Provide insights and potential concerns based on zoning regulations.

Latitude: {{{latitude}}}
Longitude: {{{longitude}}}
Project Type: {{{projectType}}}
Urban Zone: {{{urbanZone}}}

Generate a concise report (max 200 words) detailing the project suitability, potential benefits, and concerns. Focus on zoning regulations relevant to the project type and urban zone.`, 
});

const generateProjectSuitabilityReportFlow = ai.defineFlow(
  {
    name: 'generateProjectSuitabilityReportFlow',
    inputSchema: GenerateProjectSuitabilityReportInputSchema,
    outputSchema: GenerateProjectSuitabilityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
