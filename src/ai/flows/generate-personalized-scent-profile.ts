'use server';
/**
 * @fileOverview Generates a personalized scent profile based on the user's favorite fragrances.
 *
 * - generatePersonalizedScentProfile - A function that generates a personalized scent profile.
 * - GeneratePersonalizedScentProfileInput - The input type for the generatePersonalizedScentProfile function.
 * - GeneratePersonalizedScentProfileOutput - The return type for the generatePersonalizedScentProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedScentProfileInputSchema = z.object({
  favoriteFragrances: z
    .array(z.string())
    .describe('A list of the user\'s favorite fragrances.'),
});
export type GeneratePersonalizedScentProfileInput = z.infer<
  typeof GeneratePersonalizedScentProfileInputSchema
>;

const GeneratePersonalizedScentProfileOutputSchema = z.object({
  scentProfile: z
    .string()
    .describe(
      'A personalized scent profile based on the user\'s favorite fragrances.'
    ),
});
export type GeneratePersonalizedScentProfileOutput = z.infer<
  typeof GeneratePersonalizedScentProfileOutputSchema
>;

export async function generatePersonalizedScentProfile(
  input: GeneratePersonalizedScentProfileInput
): Promise<GeneratePersonalizedScentProfileOutput> {
  return generatePersonalizedScentProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedScentProfilePrompt',
  input: {
    schema: GeneratePersonalizedScentProfileInputSchema,
  },
  output: {
    schema: GeneratePersonalizedScentProfileOutputSchema,
  },
  prompt: `You are an expert perfume connoisseur. Based on the user's favorite fragrances, create a personalized scent profile for them. 

  The scent profile should be a short paragraph that describes the user's scent preferences and recommends scent families that they might enjoy.

  User's Favorite Fragrances: {{#each favoriteFragrances}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}`,
});

const generatePersonalizedScentProfileFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedScentProfileFlow',
    inputSchema: GeneratePersonalizedScentProfileInputSchema,
    outputSchema: GeneratePersonalizedScentProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
