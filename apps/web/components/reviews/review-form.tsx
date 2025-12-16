"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ReviewForm({ reviewId, token }: { reviewId: string, token?: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState(5)

    // Using native form action/submit for now
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const content = formData.get("content")

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${reviewId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ score, content })
            })
            if (res.ok) {
                router.push('/reviews')
                router.refresh()
            }
        } catch (e) {
            console.error(e)
            alert("Failed to submit review")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 border rounded-lg shadow-sm">
            <div>
                <label className="block text-sm font-medium mb-2">Recommendation Score (1-10)</label>
                <input
                    type="number" min="1" max="10"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="border p-2 rounded w-20"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Review Comments</label>
                <textarea
                    name="content"
                    required
                    className="w-full h-40 border p-3 rounded"
                    placeholder="Enter your detailed review here..."
                ></textarea>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
            </div>
        </form>
    )
}
