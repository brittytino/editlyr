"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PluginsList({ token }: { token?: string }) {
    const [plugins, setPlugins] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchPlugins = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/plugins`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) setPlugins(await res.json())
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) fetchPlugins()
    }, [token])

    const handleToggle = async (key: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/plugins/toggle`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ key, enabled: !currentStatus })
            })
            if (res.ok) fetchPlugins() // Reload to get synced state
            else alert("Failed to toggle. You might need to upgrade to PRO for this plugin.")
        } catch (e) {
            alert("Error interacting with API")
        }
    }

    if (loading) return <div>Loading plugins...</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map(p => (
                <div key={p.id} className="border rounded-lg p-6 bg-white shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                            {p.isPaid ? 'PRO REQUIRED' : 'FREE'}
                        </div>
                        {p.enabled && <span className="text-green-600 text-sm font-semibold">● Active</span>}
                    </div>

                    <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 flex-1">{p.description || "No description."}</p>

                    <Button
                        variant={p.enabled ? "outline" : "default"}
                        onClick={() => handleToggle(p.key, p.enabled)}
                    >
                        {p.enabled ? 'Disable' : 'Enable'}
                    </Button>
                </div>
            ))}
            {plugins.length === 0 && <p className="text-gray-500">No plugins available in the registry.</p>}
        </div>
    )
}
