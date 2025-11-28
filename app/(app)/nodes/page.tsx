import { PageHeader } from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy } from "lucide-react";
import AddNodeDialog from "@/components/nodes/add-node-dialog";

const nodes = [
    { id: "node-1", name: "Field-Node-01", location: "North Field", status: "online", secret: "sk_live_xxxxxx_mock_secret_1" },
    { id: "node-2", name: "Greenhouse-01", location: "Main Greenhouse", status: "online", secret: "sk_live_xxxxxx_mock_secret_2" },
    { id: "node-3", name: "Orchard-West-04", location: "Western Orchard", status: "offline", secret: "sk_live_xxxxxx_mock_secret_3" },
    { id: "node-4", name: "Hydroponics-Lab", location: "Lab Building 2", status: "warning", secret: "sk_live_xxxxxx_mock_secret_4" },
];

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" | "outline" } = {
    online: "default",
    offline: "destructive",
    warning: "secondary",
};

export default function NodesPage() {
    return (
        <div>
            <PageHeader
                title="Node Management"
                description="Add, remove, and manage your IoT sensor nodes."
            >
                <AddNodeDialog />
            </PageHeader>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Secret Key</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nodes.map((node) => (
                            <TableRow key={node.id}>
                                <TableCell className="font-medium">{node.name}</TableCell>
                                <TableCell>{node.location}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[node.status] || "outline"} className="capitalize">{node.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm">sk_live...{node.secret.slice(-4)}</span>
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
