import { Sprout } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Sprout className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold font-headline text-foreground">
        AgriSense
      </h1>
    </div>
  );
}
