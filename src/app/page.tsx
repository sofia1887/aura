'use client';

import { useState } from 'react';
import { perfumes, scentFamilies } from '@/lib/perfumes';
import type { ScentFamily } from '@/types';
import PerfumeCard from '@/components/perfume-card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sparkles, Leaf, Mountain, Flame, Citrus, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const newArrivals = perfumes.filter((p) => p.isNew);
const allPerfumes = perfumes;

const scentFamilyIcons: Record<ScentFamily, React.ElementType> = {
  Floral: Leaf,
  Woody: Mountain,
  Oriental: Flame,
  Fresh: Wind,
  Citrus: Citrus,
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ScentFamily | null>(null);

  const filteredPerfumes = activeFilter
    ? allPerfumes.filter((p) => p.scentFamily === activeFilter)
    : allPerfumes;

  const toggleFilter = (family: ScentFamily) => {
    if (activeFilter === family) {
      setActiveFilter(null);
    } else {
      setActiveFilter(family);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center rounded-2xl overflow-hidden mb-12 md:mb-16 shadow-2xl">
        <Image
          src="https://placehold.co/1200x800.png"
          alt="Abstract representation of perfume scents"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg animate-fade-in-down">
            Find Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up">
            Explore a world of exquisite fragrances and uncover the aroma that truly defines you.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-10 rounded-full transition-transform transform hover:scale-105">
            <Link href="/discover">Discover Now</Link>
          </Button>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold">New Arrivals</h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {newArrivals.map((perfume) => (
              <CarouselItem key={perfume.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <PerfumeCard perfume={perfume} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* All Fragrances Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-center">
          Explore Our Collection
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {scentFamilies.map((family) => {
            const Icon = scentFamilyIcons[family];
            return (
              <Button
                key={family}
                variant={activeFilter === family ? 'default' : 'outline'}
                onClick={() => toggleFilter(family)}
                className={cn('transition-all duration-300 transform hover:scale-105', activeFilter === family ? 'bg-primary text-primary-foreground' : 'bg-transparent')}
              >
                <Icon className="mr-2 h-4 w-4" />
                {family}
              </Button>
            );
          })}
        </div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </section>
    </div>
  );
}
