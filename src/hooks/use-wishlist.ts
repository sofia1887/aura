'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Perfume } from '@/types';

const WISHLIST_KEY = 'aura-sense-wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Perfume[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(WISHLIST_KEY);
      if (items) {
        setWishlist(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (updatedWishlist: Perfume[]) => {
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  };

  const addToWishlist = useCallback((perfume: Perfume) => {
    setWishlist((prev) => {
      const newWishlist = [...prev, perfume];
      updateLocalStorage(newWishlist);
      toast({
        title: "Added to Wishlist",
        description: `${perfume.name} is now in your wishlist.`,
      });
      return newWishlist;
    });
  }, [toast]);

  const removeFromWishlist = useCallback((perfumeId: number) => {
    setWishlist((prev) => {
      const perfume = prev.find(p => p.id === perfumeId);
      const newWishlist = prev.filter((item) => item.id !== perfumeId);
      updateLocalStorage(newWishlist);
      if (perfume) {
        toast({
          title: "Removed from Wishlist",
          description: `${perfume.name} has been removed from your wishlist.`,
        });
      }
      return newWishlist;
    });
  }, [toast]);

  const isWishlisted = useCallback((perfumeId: number) => {
    return wishlist.some((item) => item.id === perfumeId);
  }, [wishlist]);

  const toggleWishlist = useCallback((perfume: Perfume) => {
    if (isWishlisted(perfume.id)) {
      removeFromWishlist(perfume.id);
    } else {
      addToWishlist(perfume);
    }
  }, [isWishlisted, addToWishlist, removeFromWishlist]);
  
  return { wishlist, toggleWishlist, isWishlisted };
};
