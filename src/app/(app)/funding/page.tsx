'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { PageHeader } from "@/components/page-header";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { analyzeFundingOpportunity, type FundingOpportunityOutput } from '@/ai/flows/funding-opportunity-analyzer';
import { Loader2, Sparkles, TrendingUp, CheckCircle, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  location: z.string().min(2, "Location is required."),
  cropType: z.string().min(2, "Crop type is required."),
  marketDemand: z.string().min(10, "Please provide more details on market demand."),
  sensorData: z.string().min(10, "Please provide a summary of sensor data."),
  investmentAmount: z.coerce.number().min(1000, "Investment must be at least $1,000."),
});

export default function FundingPage() {
  const [result, setResult] = useState<FundingOpportunityOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      cropType: "",
      marketDemand: "",
      sensorData: "",
      investmentAmount: 50000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const analysisResult = await analyzeFundingOpportunity(values);
      setResult(analysisResult);
    });
  }

  return (
    <div>
      <PageHeader
        title="Funding Opportunity Analyzer"
        description="Evaluate agricultural investment opportunities with AI-powered insights."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analysis Parameters</CardTitle>
            <CardDescription>Fill in the details below to get an investment analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Central Valley, California" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cropType" render={({ field }) => (
                  <FormItem><FormLabel>Crop Type</FormLabel><FormControl><Input placeholder="e.g., Almonds" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="investmentAmount" render={({ field }) => (
                  <FormItem><FormLabel>Investment Amount (USD)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="marketDemand" render={({ field }) => (
                  <FormItem><FormLabel>Market Demand</FormLabel><FormControl><Textarea placeholder="e.g., High demand in export markets, stable domestic prices." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="sensorData" render={({ field }) => (
                  <FormItem><FormLabel>Sensor Data Summary</FormLabel><FormControl><Textarea placeholder="e.g., Avg temp 25°C, low humidity, requires consistent irrigation." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><Sparkles className="mr-2 h-4 w-4" /> Analyze Opportunity</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI Analysis Result</CardTitle>
            <CardDescription>Investment potential based on the provided data.</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Our AI is analyzing the data... please wait.</p>
              </div>
            )}
            {result && !isPending && (
              <div className="space-y-6">
                <div>
                  <Label>Opportunity Score</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Progress value={result.opportunityScore} className="w-[60%]" />
                    <span className="text-2xl font-bold font-headline">{result.opportunityScore}/100</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-1"><FileText className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold">Justification</h4>
                      <p className="text-sm text-muted-foreground">{result.justification}</p>
                    </div>
                  </div>
                   <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-1"><CheckCircle className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold">Recommendations</h4>
                      <p className="text-sm text-muted-foreground">{result.recommendations}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!result && !isPending && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your investment analysis will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
