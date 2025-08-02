'use client';

import Image from 'next/image';
import type { Perfume } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Tag } from 'lucide-react';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface PerfumeCardProps {
  perfume: Perfume;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(perfume.id);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-none shadow-md bg-card">
      <CardHeader className="p-0 relative">
        <Image
          src={perfume.imageUrl}
          alt={`Bottle of ${perfume.name}`}
          width={600}
          height={600}
          className="object-cover w-full h-auto aspect-square"
          data-ai-hint="perfume bottle"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full h-10 w-10 bg-background/70 hover:bg-background"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(perfume);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-5 w-5 text-foreground/60 transition-colors', wishlisted && 'fill-accent text-accent')} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="font-headline text-xl">{perfume.name}</CardTitle>
          <div className="flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            <span>{perfume.scentFamily}</span>
          </div>
        </div>
        <CardDescription className="mb-4 text-base">{perfume.description}</CardDescription>
        
        <Accordion type="single" collapsible className="w-full mt-auto">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="text-base py-2 hover:no-underline">Scent Notes</AccordionTrigger>
            <AccordionContent className="text-sm text-foreground/80">
              <p><strong className="font-semibold">Top:</strong> {perfume.topNotes.join(', ')}</p>
              <p><strong className="font-semibold">Heart:</strong> {perfume.heartNotes.join(', ')}</p>
              <p><strong className="font-semibold">Base:</strong> {perfume.baseNotes.join(', ')}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
