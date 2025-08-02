'use client';

import { useFormState } from 'react-dom';
import { generatePersonalizedScentProfile } from './actions';
import type { Perfume } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, AlertTriangle } from 'lucide-react';

const initialState = {
  profile: null,
  error: null,
};

interface ScentFormProps {
  perfumes: Perfume[];
}

export function ScentForm({ perfumes }: ScentFormProps) {
  const [state, formAction] = useFormState(generatePersonalizedScentProfile, initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Select Your Favorites</CardTitle>
            <CardDescription>Choose at least one fragrance to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {perfumes.map((perfume) => (
                <div key={perfume.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors">
                  <Checkbox id={`fragrance-${perfume.id}`} name="fragrances" value={perfume.name} />
                  <Label htmlFor={`fragrance-${perfume.id}`} className="text-base font-normal cursor-pointer flex-1">
                    {perfume.name} <span className="text-muted-foreground">({perfume.scentFamily})</span>
                  </Label>
                </div>
              ))}
            </div>
            <SubmitButton size="lg" className="w-full mt-6">
              Generate My Profile
            </SubmitButton>
          </CardContent>
        </Card>
      </form>

      <div className="lg:sticky top-24">
        {state?.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state?.profile && (
          <Card className="bg-primary/10 border-primary shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <Bot className="w-7 h-7 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">Your Personalized Scent Profile</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-foreground/90">
                {state.profile}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
