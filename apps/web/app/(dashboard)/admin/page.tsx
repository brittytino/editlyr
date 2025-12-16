import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)
    // Fetch submissions from API (server-side)
    // For admin, we might want to fetch all submissions or filter by status. 
    // Mocking for Phase 1 UI.
    let submissions: any[] = [
        { id: 1, title: "Impact of AI on Coding", status: "SUBMITTED", author: "Dr. Smith", createdAt: new Date() },
        { id: 2, title: "Modern CSS Techniques", status: "UNDER_REVIEW", author: "Jane Doe", createdAt: new Date('2023-11-01') },
        { id: 3, title: "Legacy Systems", status: "REJECTED", author: "Bob Brown", createdAt: new Date('2023-10-15') },
    ]

    // In real implementation:
    // if (session?.accessToken) { ... fetch(`${API}/submissions?role=admin`) ... }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Editorial Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Settings</Button>
                </div>
            </div>

            <Tabs defaultValue="inbox" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="review">Under Review</TabsTrigger>
                    <TabsTrigger value="archive">Archive</TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submission Inbox</CardTitle>
                            <CardDescription>
                                Unassigned submissions requiring attention.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.filter(s => s.status === 'SUBMITTED').map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">{sub.title}</TableCell>
                                            <TableCell>{sub.author}</TableCell>
                                            <TableCell>
                                                <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent",
                                                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                                )}>
                                                    {sub.status}
                                                </div>
                                            </TableCell>
                                            <TableCell>{sub.createdAt.toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm">Assign Editor</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="review" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Under Review</CardTitle>
                            <CardDescription>Submissions currently in the peer review process.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.filter(s => s.status === 'UNDER_REVIEW').map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">{sub.title}</TableCell>
                                            <TableCell>{sub.author}</TableCell>
                                            <TableCell>
                                                <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent",
                                                    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                                )}>
                                                    {sub.status}
                                                </div>
                                            </TableCell>
                                            <TableCell>{sub.createdAt.toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline">View Reviews</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="archive" className="space-y-4">
                    <div className="text-sm text-muted-foreground p-4">Archived submissions will appear here.</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
