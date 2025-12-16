"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock audit data
const logs = [
    { id: "evt_1", action: "journal.settings.update", actor: "admin@example.com", ip: "192.168.1.1", created: new Date() },
    { id: "evt_2", action: "user.role.updated", actor: "admin@example.com", ip: "192.168.1.1", created: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "evt_3", action: "submission.created", actor: "author@example.com", ip: "10.0.0.42", created: new Date(Date.now() - 1000 * 60 * 45) },
    { id: "evt_4", action: "submission.published", actor: "editor@example.com", ip: "172.16.0.1", created: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "evt_5", action: "journal.create", actor: "system", ip: "127.0.0.1", created: new Date(Date.now() - 1000 * 60 * 60 * 24) },
]

export default function AuditLogPage() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Audit Log</h2>
                <p className="text-muted-foreground">Security trail of all actions.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Activity History</CardTitle>
                    <CardDescription>
                        View recent sensitive actions performed within the tenant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Actor</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead className="text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">{log.id}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono text-xs font-normal">
                                            {log.action}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{log.actor}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        {log.created.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
