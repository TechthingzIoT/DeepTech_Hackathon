'use client';

import * as React from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";


const chartData = [
  { date: "2024-07-01", temp_avg: 22, temp_max: 28, temp_min: 18 },
  { date: "2024-07-02", temp_avg: 23, temp_max: 29, temp_min: 19 },
  { date: "2024-07-03", temp_avg: 24, temp_max: 30, temp_min: 20 },
  { date: "2024-07-04", temp_avg: 21, temp_max: 27, temp_min: 17 },
  { date: "2024-07-05", temp_avg: 25, temp_max: 31, temp_min: 21 },
  { date: "2024-07-06", temp_avg: 26, temp_max: 32, temp_min: 22 },
  { date: "2024-07-07", temp_avg: 24, temp_max: 30, temp_min: 20 },
];

const chartConfig = {
  temp_avg: { label: "Avg Temp (°C)", color: "hsl(var(--chart-1))" },
  temp_max: { label: "Max Temp (°C)", color: "hsl(var(--chart-2))" },
  temp_min: { label: "Min Temp (°C)", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function AnalyticsPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 6, 1),
        to: addDays(new Date(2024, 6, 1), 6),
    });

    return (
        <div>
            <PageHeader
                title="Sensor Analytics"
                description="Analyze historical sensor data and export reports."
            >
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Data
                </Button>
            </PageHeader>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="font-headline">Data Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Weekly Temperature Analysis</CardTitle>
                    <CardDescription>Average, maximum, and minimum temperatures for the selected period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[400px] w-full">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM d")} tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="temp_avg" fill="var(--color-temp_avg)" radius={4} />
                            <Bar dataKey="temp_max" fill="var(--color-temp_max)" radius={4} />
                            <Bar dataKey="temp_min" fill="var(--color-temp_min)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
