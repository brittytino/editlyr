"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CreateJournalPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/tenants`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const result = await res.json()
                // Redirect to journal login or dashboard
                // For MVP, just redirect to login with a success message or to the new subdomain if we could
                // We'll redirect to standard login for now
                router.push('/auth/login?journal=' + result.journal.slug)
            } else {
                const err = await res.json()
                setError(err.message || "Failed to create journal")
            }
        } catch (e) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg border shadow-sm w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Start Your Journal</h1>
                    <p className="text-gray-500 text-sm">Create a free account and journal instantly.</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Journal Name</label>
                        <input name="journalName" required className="w-full p-2 border rounded" placeholder="Journal of Science" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">URL Slug</label>
                        <div className="flex items-center">
                            <input name="slug" required className="w-full p-2 border rounded-l" placeholder="science-journal" />
                            <span className="bg-gray-100 border border-l-0 p-2 rounded-r text-gray-500 text-sm">.editlyr.org</span>
                        </div>
                    </div>

                    <hr />

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Admin Email</label>
                        <input name="adminEmail" type="email" required className="w-full p-2 border rounded" placeholder="admin@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input name="adminPassword" type="password" required className="w-full p-2 border rounded" />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Journal'}
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/auth/login" className="underline">Login</Link>
                </p>
            </div>
        </div>
    )
}
