import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Droplets, Thermometer, Waves, AlertTriangle } from "lucide-react";
import AiPrediction from "@/components/dashboard/ai-prediction";
import SensorCharts from "@/components/dashboard/sensor-charts";

const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: React.ElementType, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Real-time overview of your agricultural operations."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Active Nodes" value="4" icon={Cpu} description="Total IoT nodes online" />
                <StatCard title="Avg. Temperature" value="24.5°C" icon={Thermometer} description="Across all locations" />
                <StatCard title="Avg. Humidity" value="68%" icon={Droplets} description="Across all locations" />
                <StatCard title="Active Alerts" value="2" icon={AlertTriangle} description="Requiring immediate attention" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SensorCharts />
                </div>
                <div className="lg:col-span-1">
                    <AiPrediction />
                </div>
            </div>
        </div>
    );
}
