'use server';

/**
 * @fileOverview A funding opportunity analyzer AI agent.
 *
 * - analyzeFundingOpportunity - A function that handles the funding opportunity analysis process.
 * - FundingOpportunityInput - The input type for the analyzeFundingOpportunity function.
 * - FundingOpportunityOutput - The return type for the analyzeFundingOpportunity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FundingOpportunityInputSchema = z.object({
  location: z.string().describe('The geographical location to analyze.'),
  sensorData: z.string().describe('A summary of sensor data for the location, including temperature, humidity, and soil moisture.'),
  cropType: z.string().describe('The type of crop being grown in the area.'),
  marketDemand: z.string().describe('Information about the current market demand for the crop.'),
  investmentAmount: z.number().describe('The potential investment amount in USD.'),
});
export type FundingOpportunityInput = z.infer<typeof FundingOpportunityInputSchema>;

const FundingOpportunityOutputSchema = z.object({
  opportunityScore: z.number().describe('A score from 0 to 100 indicating the investment potential of the area.'),
  justification: z.string().describe('A detailed explanation of the opportunity score, including strengths and weaknesses.'),
  recommendations: z.string().describe('Specific recommendations for investors based on the analysis.'),
});
export type FundingOpportunityOutput = z.infer<typeof FundingOpportunityOutputSchema>;

export async function analyzeFundingOpportunity(input: FundingOpportunityInput): Promise<FundingOpportunityOutput> {
  return analyzeFundingOpportunityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fundingOpportunityPrompt',
  input: {schema: FundingOpportunityInputSchema},
  output: {schema: FundingOpportunityOutputSchema},
  prompt: `You are an AI assistant that evaluates agricultural investment opportunities.

  Based on the following information, provide an opportunity score (0-100), a justification for the score, and recommendations for investors.

  Location: {{{location}}}
  Sensor Data: {{{sensorData}}}
  Crop Type: {{{cropType}}}
  Market Demand: {{{marketDemand}}}
  Investment Amount: ${{{investmentAmount}}}

  Opportunity Score Guidelines:
  - 90-100: Excellent investment opportunity with high potential and minimal risk.
  - 70-89: Good investment opportunity with solid potential and manageable risk.
  - 50-69: Moderate investment opportunity with average potential and moderate risk.
  - 30-49: Risky investment opportunity with below-average potential.
  - 0-29: Very risky investment opportunity with minimal potential.
  `,
});

const analyzeFundingOpportunityFlow = ai.defineFlow(
  {
    name: 'analyzeFundingOpportunityFlow',
    inputSchema: FundingOpportunityInputSchema,
    outputSchema: FundingOpportunityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
