import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function SplashPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Welcome to <span className="text-primary">AgriSense</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Harnessing the power of IoT and AI to revolutionize agriculture. Monitor your crops, predict yields, and make data-driven decisions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AgriSense. All Rights Reserved.
      </footer>
    </div>
  );
}
