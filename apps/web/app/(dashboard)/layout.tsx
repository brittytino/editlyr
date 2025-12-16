export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <main className="w-full pt-16">{children}</main>
        </div>
    )
}
