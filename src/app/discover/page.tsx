import { ScentForm } from './scent-form';
import { perfumes } from '@/lib/perfumes';
import { Bot } from 'lucide-react';

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-4">
        <Bot className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Discover Your Scent Profile</h1>
      </div>
      <p className="text-lg text-foreground/80 mb-8 max-w-3xl">
        Let our AI connoisseur guide you. Select a few of your favorite fragrances from our collection, and we'll generate a personalized scent profile just for you, recommending new paths on your olfactory journey.
      </p>
      <ScentForm perfumes={perfumes} />
    </div>
  );
}
