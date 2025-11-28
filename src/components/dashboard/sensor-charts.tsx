'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartData = [
  { time: "08:00", temperature: 22, humidity: 65, moisture: 55 },
  { time: "09:00", temperature: 23, humidity: 62, moisture: 53 },
  { time: "10:00", temperature: 24, humidity: 60, moisture: 50 },
  { time: "11:00", temperature: 25, humidity: 58, moisture: 48 },
  { time: "12:00", temperature: 26, humidity: 55, moisture: 45 },
  { time: "13:00", temperature: 27, humidity: 53, moisture: 42 },
  { time: "14:00", temperature: 26.5, humidity: 56, moisture: 44 },
];

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
  moisture: {
    label: "Soil Moisture (%)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function SensorCharts() {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="font-headline">Sensor Analytics</CardTitle>
          <CardDescription>Live data from the last 6 hours</CardDescription>
        </div>
        <Select defaultValue="node-1">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Node" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="node-1">Field-Node-01</SelectItem>
            <SelectItem value="node-2">Greenhouse-01</SelectItem>
            <SelectItem value="node-3">Orchard-West-04</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area dataKey="temperature" type="monotone" fill="var(--color-temperature)" fillOpacity={0.4} stroke="var(--color-temperature)" />
                <Area dataKey="humidity" type="monotone" fill="var(--color-humidity)" fillOpacity={0.4} stroke="var(--color-humidity)" />
                <Area dataKey="moisture" type="monotone" fill="var(--color-moisture)" fillOpacity={0.4} stroke="var(--color-moisture)" />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
