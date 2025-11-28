import Image from 'next/image';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from '@/components/ui/badge';

export default function MonitoringPage() {
  const monitoringFeeds = PlaceHolderImages.filter(img => img.id.startsWith("monitoring-feed"));

  return (
    <div>
      <PageHeader
        title="Live Monitoring Feeds"
        description="Real-time video streams from your WiFi, FPV, and ESP32 cameras."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {monitoringFeeds.map((feed) => (
          <Card key={feed.id}>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="font-headline">{feed.description.split(" from ")[1] || "Camera Feed"}</CardTitle>
                    <CardDescription>{feed.description}</CardDescription>
                </div>
                <Badge variant="destructive" className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    LIVE
                </Badge>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-md border">
                <Image
                  src={feed.imageUrl}
                  alt={feed.description}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  data-ai-hint={feed.imageHint}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
