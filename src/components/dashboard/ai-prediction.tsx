'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCropHealthPrediction, type CropHealthPredictionOutput } from '@/ai/flows/crop-health-predictions';
import { Wand2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function AiPrediction() {
  const [prediction, setPrediction] = useState<CropHealthPredictionOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGetPrediction = () => {
    startTransition(async () => {
      // Mock sensor data for the demo
      const mockSensorData = {
        temperature: 28,
        humidity: 75,
        soilMoisture: 35,
        waterLevel: 12,
        pumpStatus: false,
        nodeName: 'Field-Node-01',
        location: 'Main Farm',
      };
      const result = await getCropHealthPrediction(mockSensorData);
      setPrediction(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Crop Health Prediction
        </CardTitle>
        <CardDescription>
          Get an AI-powered analysis of your crop health based on current sensor data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {prediction && !isPending && (
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Health Alert</AlertTitle>
              <AlertDescription>{prediction.alert}</AlertDescription>
            </Alert>
            <div>
              <h4 className="font-semibold mb-1">Prediction & Recommendations</h4>
              <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
            </div>
          </div>
        )}
        {!prediction && !isPending && (
            <div className="text-center text-sm text-muted-foreground py-8">
                Click the button to generate a prediction.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetPrediction} disabled={isPending} className="w-full">
          {isPending ? 'Analyzing...' : 'Analyze Crop Health'}
        </Button>
      </CardFooter>
    </Card>
  );
}
