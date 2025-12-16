"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function InviteUserPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            // Assuming session token is handled via cookie proxy or we need to implement token passing in client
            // For MVP simplification we rely on the session cookie if API is on same domain, or we'd fetch calls via Next.js API route
            // Here simplified:
            await fetch('/api/proxy/users/invite', { // We'd need a proxy route or direct call
                method: 'POST',
                body: JSON.stringify(data)
            })
            // To be robust, let's just log for now as we haven't set up the proxy fully in this chat context
            alert("Invitation simulated! (API endpoint needed)")
            router.push('/admin/users')
        } catch (e) {
            alert("Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Invite Team Member</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded border shadow-sm">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input name="email" type="email" required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select name="role" className="w-full p-2 border rounded">
                        <option value="EDITOR">Editor</option>
                        <option value="REVIEWER">Reviewer</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending Invite...' : 'Send Invitation'}
                </Button>
            </form>
        </div>
    )
}
