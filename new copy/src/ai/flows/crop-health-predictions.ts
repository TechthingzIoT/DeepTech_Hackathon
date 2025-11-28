'use server';

/**
 * @fileOverview A crop health prediction AI agent.
 *
 * - getCropHealthPrediction - A function that handles the crop health prediction process.
 * - CropHealthPredictionInput - The input type for the getCropHealthPrediction function.
 * - CropHealthPredictionOutput - The return type for the getCropHealthPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropHealthPredictionInputSchema = z.object({
  temperature: z.number().describe('The temperature in Celsius.'),
  humidity: z.number().describe('The humidity percentage.'),
  soilMoisture: z.number().describe('The soil moisture percentage.'),
  waterLevel: z.number().describe('The water level in centimeters.'),
  pumpStatus: z.boolean().describe('The status of the water pump (true if on, false if off).'),
  nodeName: z.string().describe('The name of the IoT node.'),
  location: z.string().describe('The location of the IoT node.'),
});
export type CropHealthPredictionInput = z.infer<typeof CropHealthPredictionInputSchema>;

const CropHealthPredictionOutputSchema = z.object({
  prediction: z.string().describe('The AI-powered prediction of crop health.'),
  alert: z.string().describe('Any alerts or warnings regarding crop health.'),
});
export type CropHealthPredictionOutput = z.infer<typeof CropHealthPredictionOutputSchema>;

export async function getCropHealthPrediction(input: CropHealthPredictionInput): Promise<CropHealthPredictionOutput> {
  return cropHealthPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropHealthPredictionPrompt',
  input: {schema: CropHealthPredictionInputSchema},
  output: {schema: CropHealthPredictionOutputSchema},
  prompt: `You are an AI assistant providing crop health predictions based on sensor data.

  Node Name: {{{nodeName}}}
  Location: {{{location}}}
  Temperature: {{{temperature}}}°C
  Humidity: {{{humidity}}}%
  Soil Moisture: {{{soilMoisture}}}%
  Water Level: {{{waterLevel}}} cm
  Pump Status: {{#if pumpStatus}}On{{else}}Off{{/if}}

  Provide a prediction of the crop health and any potential issues. Include specific recommendations to address these issues. Also, provide any alert about the crop health.
  Be very specific with your recommendations, and make sure to mention all sensor readings in the alert field if they are out of the ordinary.
  `,
});

const cropHealthPredictionFlow = ai.defineFlow(
  {
    name: 'cropHealthPredictionFlow',
    inputSchema: CropHealthPredictionInputSchema,
    outputSchema: CropHealthPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
