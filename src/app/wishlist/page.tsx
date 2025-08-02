'use client';

import PerfumeCard from '@/components/perfume-card';
import { useWishlist } from '@/hooks/use-wishlist';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Your Wishlist</h1>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlist.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
          <p className="mt-2 text-muted-foreground">
            Add your favorite fragrances to your wishlist to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
