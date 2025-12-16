import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function PlatformPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 h-16 flex items-center border-b">
                <Link href="/" className="font-bold text-xl">Editlyr</Link>
                <div className="ml-auto flex gap-4 items-center">
                    <Link href="/login"><Button variant="ghost">Login</Button></Link>
                    <Link href="/create-journal"><Button>Start a Journal</Button></Link>
                    <ModeToggle />
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center">
                <section className="w-full py-24 md:py-32 lg:py-40 text-center px-4 bg-background">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto">
                        Launch your academic journal in minutes.
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Editlyr is the modern open-source platform for scholarly publishing.
                        Manage submissions, peer reviews, and publishing—all in one place.
                    </p>
                    <Link href="/create-journal">
                        <Button size="lg" className="text-lg px-8 py-6 h-auto">Create Free Journal</Button>
                    </Link>
                </section>

                <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl sm:leading-none">
                                How it Works
                            </h2>
                            <p className="text-muted-foreground mt-4">Three simple steps to professional publishing.</p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <svg
                                        className=" h-10 w-10 text-primary"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">1. Create Journal</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Get your own subdomain instantly. Configure your branding and fields.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <svg
                                        className=" h-10 w-10 text-primary"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">2. Invite Editors</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Assign roles, track submissions, and manage peer review workflows.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <svg
                                        className=" h-10 w-10 text-primary"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">3. Publish Openly</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Publish articles with DOIs, PDF generation, and Google Scholar indexing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl sm:leading-none">
                                Simple Pricing
                            </h2>
                            <p className="text-muted-foreground mt-4">Free for community journals. Upgrade for power features.</p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                            <div className="flex flex-col p-6 bg-card text-card-foreground shadow-sm border rounded-lg">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold">Community</h3>
                                    <span className="text-3xl font-bold">$0</span><span className="text-muted-foreground">/mo</span>
                                </div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-center"><span className="mr-2">✓</span> Unlimited Submissions</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> 1 Journal</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> Basic Theme</li>
                                </ul>
                                <Button className="w-full mt-auto" variant="outline">Start Free</Button>
                            </div>
                            <div className="flex flex-col p-6 bg-primary text-primary-foreground shadow-lg border-primary border rounded-lg relative">
                                <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold">Professional</h3>
                                    <span className="text-3xl font-bold">$29</span><span className="text-primary-foreground/80">/mo</span>
                                </div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-center"><span className="mr-2">✓</span> All Free features</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> Custom Domain</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> Email Whitelabeling</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> Priority Support</li>
                                </ul>
                                <Button className="w-full mt-auto bg-background text-foreground hover:bg-background/90" variant="secondary">Start Trial</Button>
                            </div>
                            <div className="flex flex-col p-6 bg-card text-card-foreground shadow-sm border rounded-lg">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold">Institution</h3>
                                    <span className="text-3xl font-bold">Contact</span>
                                </div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-center"><span className="mr-2">✓</span> Multiple Journals</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> SSO / SAML</li>
                                    <li className="flex items-center"><span className="mr-2">✓</span> Custom Contracts</li>
                                </ul>
                                <Button className="w-full mt-auto" variant="outline">Contact Sales</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-6 text-center text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} Editlyr Platform.
            </footer>
        </div>
    )
}
