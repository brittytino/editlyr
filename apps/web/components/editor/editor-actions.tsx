"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function EditorActions({ submissionId, token }: { submissionId: string, token?: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDecision = async (decision: string) => {
        if (!confirm(`Are you sure you want to ${decision} this submission?`)) return
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/editor/submissions/${submissionId}/decision`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ decision })
            })
            if (res.ok) router.refresh()
        } catch (e) { console.error(e) }
        finally { setLoading(false) }
    }

    const assignReviewer = async () => {
        const reviewerId = prompt("Enter Reviewer User ID (For MVP):") // Mocking reviewer selection
        if (!reviewerId) return

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/editor/submissions/${submissionId}/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ reviewerId })
            })
            router.refresh()
        } catch (e) {
            alert("Failed to assign reviewer (check ID)")
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900">Editorial Actions</h3>

            <div className="space-y-2">
                <Button onClick={assignReviewer} variant="outline" className="w-full justify-start">
                    + Assign Reviewer
                </Button>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
                <Button
                    onClick={() => handleDecision('ACCEPT')}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                    Accept Submission
                </Button>
                <Button
                    onClick={() => handleDecision('REVISION')}
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                    Request Revision
                </Button>
                <Button
                    onClick={() => handleDecision('REJECT')}
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                    Reject Submission
                </Button>
            </div>
        </div>
    )
}
