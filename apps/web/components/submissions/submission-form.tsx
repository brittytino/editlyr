"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"

export default function SubmissionForm() {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !session?.accessToken) return
        setLoading(true)

        try {
            // Mock file upload logic for Phase 1
            const formData = new FormData(e.currentTarget)
            const payload = {
                title: formData.get("title"),
                abstract: formData.get("abstract"),
                fileUrl: `https://mock-s3/submissions/${file.name}`,
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/submissions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                router.push("/author")
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Manuscript Details</CardTitle>
                        <CardDescription>
                            Provide the metadata for your submission.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title</Label>
                            <Input id="title" name="title" required placeholder="e.g. The Effects of..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="abstract">Abstract</Label>
                            <textarea
                                id="abstract"
                                name="abstract"
                                required
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Paste your abstract here..."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>File Upload</CardTitle>
                        <CardDescription>
                            Upload your manuscript PDF (anonymized if required).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                            <div className="p-4 bg-muted rounded-full mb-4">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            {file ? (
                                <div className="flex items-center space-x-2 text-primary font-medium">
                                    <FileText className="h-4 w-4" />
                                    <span>{file.name}</span>
                                    <button type="button" onClick={() => setFile(null)} className="text-muted-foreground hover:text-destructive text-sm ml-2">(remove)</button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">
                                        Drag & drop or Click to upload
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PDF only (max 10MB)
                                    </p>
                                    <Input
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                                        Select File
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={loading || !file}>
                            {loading ? 'Submitting...' : 'Submit Manuscript'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
    )
}
