export type ScentFamily = "Floral" | "Woody" | "Oriental" | "Fresh" | "Citrus";

export interface Perfume {
  id: number;
  name: string;
  scentFamily: ScentFamily;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  imageUrl: string;
  isNew: boolean;
}
