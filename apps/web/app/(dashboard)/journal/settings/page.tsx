"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { UpgradeModal } from "@/components/billing/upgrade-modal"

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Journal Information</CardTitle>
                            <CardDescription>
                                Manage your journal's public details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Journal Name</Label>
                                <Input id="name" defaultValue="Journal of Science" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" defaultValue="An open-access journal..." />
                            </div>
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Custom Domain</h3>
                                <p className="text-sm text-muted-foreground">
                                    Connect your own domain (e.g., journal.university.edu).
                                </p>
                                <div className="flex gap-2">
                                    <Input placeholder="journal.example.com" className="max-w-md" />
                                    <Button>Connect</Button>
                                </div>
                                <div className="bg-muted p-4 rounded-md text-sm font-mono space-y-2">
                                    <p className="font-semibold font-sans mb-1 text-muted-foreground">DNS Configuration</p>
                                    <div className="flex justify-between border-b pb-1">
                                        <span>Type</span>
                                        <span>CNAME</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <span>Name</span>
                                        <span>journal</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Target</span>
                                        <span>cname.editlyr.org</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="roles">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Management</CardTitle>
                            <CardDescription>
                                Invite editors and reviewers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md border border-dashed text-center">
                                Team management features are available here.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="branding">
                    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center text-center p-6">
                            <div className="p-3 bg-background rounded-full shadow-sm mb-4">
                                <Lock className="h-6 w-6 text-amber-500" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Unlock Custom Branding</h3>
                            <p className="text-muted-foreground max-w-sm mb-4">
                                Upgrade to the Professional plan to use custom logos, colors, and fonts for your journal.
                            </p>
                            <UpgradeModal>
                                <Button className="bg-amber-600 hover:bg-amber-700 text-white">Upgrade Now</Button>
                            </UpgradeModal>
                        </div>
                        <CardHeader className="opacity-50">
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the look and feel of your journal portal.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 opacity-50 pointer-events-none">
                            <div className="space-y-2">
                                <Label>Primary Color</Label>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600" />
                                    <div className="h-8 w-8 rounded-full bg-slate-900" />
                                    <div className="h-8 w-8 rounded-full bg-green-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Logo Upload</Label>
                                <div className="border border-dashed p-8 rounded text-center">
                                    Upload Logo
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
