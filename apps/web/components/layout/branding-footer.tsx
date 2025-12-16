"use client"

import { usePathname } from "next/navigation"

export default function BrandingFooter() {
    const pathname = usePathname()
    const isPublic = !pathname.startsWith('/admin') && !pathname.startsWith('/editor') && !pathname.startsWith('/author')
    // Logic: Free plan journals show this.
    // For MVP, we show it everywhere on the dashboard to simulate "Free Plan" enforcement.
    // In real app, we check the session/journal plan.

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <a href="https://editlyr.org" target="_blank" className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:bg-gray-800 transition">
                Powered by Editlyr
            </a>
        </div>
    )
}
