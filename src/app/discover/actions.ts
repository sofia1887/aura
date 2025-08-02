'use server';

import { generatePersonalizedScentProfile as generate } from '@/ai/flows/generate-personalized-scent-profile';
import { z } from 'zod';

const schema = z.object({
  fragrances: z.array(z.string()).min(1, { message: 'Please select at least one fragrance.' }),
});

export async function generatePersonalizedScentProfile(prevState: any, formData: FormData) {
  const favoriteFragrances = formData.getAll('fragrances') as string[];
  
  const parsed = schema.safeParse({ fragrances: favoriteFragrances });

  if (!parsed.success) {
    return { profile: null, error: parsed.error.errors.map((e) => e.message).join(', ') };
  }

  try {
    const result = await generate({ favoriteFragrances });
    return { profile: result.scentProfile, error: null };
  } catch (e) {
    console.error(e);
    return { profile: null, error: 'An unexpected error occurred. Please try again later.' };
  }
}
