import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlatformPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 h-16 flex items-center border-b">
                <Link href="/" className="font-bold text-xl">Editlyr</Link>
                <div className="ml-auto flex gap-4">
                    <Link href="/login"><Button variant="ghost">Login</Button></Link>
                    <Link href="/create-journal"><Button>Start a Journal</Button></Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-6 max-w-3xl">
                    Launch your academic journal in minutes.
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    Editlyr is the modern open-source platform for scholarly publishing.
                    Manage submissions, peer reviews, and publishing—all in one place.
                </p>
                <Link href="/create-journal">
                    <Button size="lg" className="text-lg px-8 py-6">Create Free Journal</Button>
                </Link>
            </main>

            <footer className="py-6 text-center text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} Editlyr Platform.
            </footer>
        </div>
    )
}
