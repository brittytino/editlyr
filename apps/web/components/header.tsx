"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="font-bold text-xl mr-8">
                    Editlyr
                </Link>

                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </header>
    )
}
