import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar className="hidden md:block w-64 border-r" />
            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
                <Header />
                <main className="flex-1 space-y-4 p-8 pt-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
