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
import { cn } from "@/lib/utils"

export default async function AuthorDashboard() {
    const session = await getServerSession(authOptions)
    // Fetch submissions from API (server-side)
    let submissions = []
    if (session?.accessToken) {
        try {
            const res = await fetch(`${process.env.API_URL}/submissions`, {
                headers: { Authorization: `Bearer ${session.accessToken}` }
            })
            if (res.ok) submissions = await res.json()
        } catch (e) { console.error(e) }
    }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/author/submit">
                        <Button>New Submission</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>
                        Manage your manuscript submissions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {submissions.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            No submissions found. Create a new one to get started.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {submissions.map((sub: any) => (
                                    <TableRow key={sub.id}>
                                        <TableCell className="font-medium">{sub.title}</TableCell>
                                        <TableCell>
                                            <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent",
                                                sub.status === 'DRAFT' && "bg-muted text-muted-foreground",
                                                sub.status === 'SUBMITTED' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
                                                sub.status === 'UNDER_REVIEW' && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
                                                sub.status === 'ACCEPTED' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
                                                sub.status === 'REJECTED' && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
                                            )}>
                                                {sub.status}
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
