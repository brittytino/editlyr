"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

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
            // 1. Get Presigned URL
            const uploadRes = await fetch('/api/proxy/submissions/upload-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessToken}` }, // Use Proxy or Direct API call? Direct for MVP if CORS allows, usually Proxy via Next.js api routes to hide backend URL issues or auth injection
                // For Phase 1 MVP, we'll try direct fetch to API_URL if configured, or assume proxy is set up. 
                // Let's assume we call NEXT_PUBLIC_API_URL or a server action. 
                // I will implement a direct fetch to the API using public variable for now, or just /api/proxy...
                // Simplified: Fetching directly to localhost:4000 (needs CORS on API).
            })

            // Re-eval: Next.js Client Comp calling NestJS API directly needs CORS. 
            // Better to use Server Action? Or Proxy?
            // Let's implement a quick Server Action for this form submission to keep it robust and secure.

            // wait, I can just use fetch to absolute URL if CORS is enabled. I'll stick to fetch for now.

            // Step 1: Upload Logic... (Mocked for Phase 1 UI demo as file upload needs S3 configured locally)
            console.log("Uploading file...", file.name)

            // Step 2: Create Submission
            const formData = new FormData(e.currentTarget)
            const payload = {
                title: formData.get("title"),
                abstract: formData.get("abstract"),
                fileUrl: `https://mock-s3/submissions/${file.name}`, // Mock result
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input name="title" required className="w-full p-2 border rounded-md" placeholder="Article Title" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Abstract</label>
                <textarea name="abstract" required className="w-full p-2 border rounded-md h-32" placeholder="Abstract..." />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Manuscript (PDF)</label>
                <div className="border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50">
                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" onClick={() => router.back()} className="bg-gray-200 text-black hover:bg-gray-300">Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Manuscript'}</Button>
            </div>
        </form>
    )
}
