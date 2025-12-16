"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Zap } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Current Plan */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Current Plan</span>
                            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Community
                            </span>
                        </CardTitle>
                        <CardDescription>
                            You are on the free Community plan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Storage Usage</span>
                                    <span className="text-muted-foreground">2.4 GB / 5 GB</span>
                                </div>
                                <Progress value={48} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Monthly Emails</span>
                                    <span className="text-muted-foreground">450 / 2,000</span>
                                </div>
                                <Progress value={22} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm bg-muted/50 p-4 rounded-lg border">
                            <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                            <div className="flex-1">
                                <p className="font-medium">Upgrade to Professional to unlock more resources.</p>
                                <p className="text-muted-foreground">Get 100GB storage, unlimited emails, and custom branding.</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Upgrade Plan</Button>
                    </CardFooter>
                </Card>

                {/* Payment Method */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>
                            Your default payment instrument.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 border rounded-lg">
                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">Visa ending in 4242</p>
                                <p className="text-xs text-muted-foreground">Expires 12/2024</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Update Method</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Invoices */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>
                        Recent billing statements and receipts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Download</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV-001</TableCell>
                                <TableCell>October 1, 2023</TableCell>
                                <TableCell>$0.00</TableCell>
                                <TableCell><span className="text-green-600 font-medium">Paid</span></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV-002</TableCell>
                                <TableCell>November 1, 2023</TableCell>
                                <TableCell>$0.00</TableCell>
                                <TableCell><span className="text-green-600 font-medium">Paid</span></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
