"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function BillingAction({ token }: { token?: string }) {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/billing/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (e) {
            alert("Billing system unavailable in dev mode without Stripe keys.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button onClick={handleUpgrade} className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
            {loading ? 'Processing...' : 'Upgrade Now'}
        </Button>
    )
}
