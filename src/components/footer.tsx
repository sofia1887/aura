import { Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex h-24 items-center justify-center px-4">
        <div className="text-center text-foreground/60">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="font-bold font-headline">AuraSense</p>
            </div>
            <p className="text-sm">&copy; {currentYear} House of Aura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
