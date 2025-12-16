import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function PricingPage() {
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

            <main className="flex-1 py-16 bg-gray-50 dark:bg-slate-900/50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                            Fair, Predictable Pricing
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            No hidden fees. No "contact us" for basic features. Upgrade when you grow.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                        {/* Community Plan */}
                        <div className="flex flex-col p-8 bg-card text-card-foreground shadow-sm border rounded-xl">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">Community</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold">$0</span>
                                    <span className="ml-1 text-muted-foreground">/mo</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">For new journals and student led initiatives.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Unlimited Submissions</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> 1 Journal</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Basic Theme</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> PDF Generation</li>
                                <li className="flex items-center text-muted-foreground"><X className="mr-3 h-5 w-5" /> Custom Domain</li>
                                <li className="flex items-center text-muted-foreground"><X className="mr-3 h-5 w-5" /> Whitelabel Emails</li>
                            </ul>
                            <Link href="/create-journal" className="w-full">
                                <Button className="w-full" variant="outline" size="lg">Start Free</Button>
                            </Link>
                        </div>

                        {/* Professional Plan */}
                        <div className="flex flex-col p-8 bg-card text-card-foreground shadow-lg border-2 border-primary rounded-xl relative scale-105 z-10">
                            <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">Professional</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold">$29</span>
                                    <span className="ml-1 text-muted-foreground">/mo</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">For established journals requiring branding and support.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> <strong>Everything in Free</strong></li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Custom Domain</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Whitelabel Emails</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Priority Email Support</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Advanced Analytics</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Crossref DOI Registration</li>
                            </ul>
                            <Link href="/create-journal" className="w-full">
                                <Button className="w-full" size="lg">Get Started</Button>
                            </Link>
                        </div>

                        {/* Institution Plan */}
                        <div className="flex flex-col p-8 bg-card text-card-foreground shadow-sm border rounded-xl">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">Institution</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold">Custom</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">For universities managing multiple journals.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> <strong>Unlimited Journals</strong></li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> SSO / SAML Integration</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Custom SLAs</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> Dedicated Account Manager</li>
                                <li className="flex items-center"><Check className="mr-3 h-5 w-5 text-primary" /> On-premise Options</li>
                            </ul>
                            <Button className="w-full" variant="outline" size="lg">Contact Sales</Button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center text-sm text-gray-500 border-t bg-background">
                © {new Date().getFullYear()} Editlyr Platform.
            </footer>
        </div>
    )
}
