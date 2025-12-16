"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    FileText,
    Settings,
    BookOpen,
    Upload,
    Users,
    PenTool,
    CheckSquare,
    Sliders,
    Shield,
    Zap
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12 bg-gray-50/40 dark:bg-slate-900/50 border-r h-screen w-64 fixed left-0 top-0 overflow-y-auto hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Editlyr
                    </h2>
                    <div className="space-y-1">
                        <Link href="/dashboard">
                            <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/author">
                            <Button variant={pathname?.startsWith("/author") ? "secondary" : "ghost"} className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                Authoring
                            </Button>
                        </Link>
                        <Link href="/editor">
                            <Button variant={pathname?.startsWith("/editor") ? "secondary" : "ghost"} className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                Editorial
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Journal
                    </h2>
                    <div className="space-y-1">
                        <Link href="/journal/submissions">
                            <Button variant={pathname?.startsWith("/journal") ? "secondary" : "ghost"} className="w-full justify-start">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Submissions
                            </Button>
                        </Link>
                        <Link href="/reviews">
                            <Button variant={pathname?.startsWith("/reviews") ? "secondary" : "ghost"} className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                Reviews
                            </Button>
                        </Link>
                        <Link href="/admin">
                            <Button variant={pathname?.startsWith("/admin") ? "secondary" : "ghost"} className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                Admin
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        System
                    </h2>
                    <div className="space-y-1">
                        <Link href="/admin/audit">
                            <Button variant={pathname?.startsWith("/admin/audit") ? "secondary" : "ghost"} className="w-full justify-start">
                                <Shield className="mr-2 h-4 w-4" />
                                Audit Log
                            </Button>
                        </Link>
                        <Link href="/plugins">
                            <Button variant={pathname?.startsWith("/plugins") ? "secondary" : "ghost"} className="w-full justify-start">
                                <Zap className="mr-2 h-4 w-4" />
                                Plugins
                            </Button>
                        </Link>
                        <Link href="/journal/settings">
                            <Button variant={pathname?.startsWith("/journal/settings") ? "secondary" : "ghost"} className="w-full justify-start">
                                <Sliders className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
