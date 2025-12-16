"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/ui/stepper"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

const steps = ["Journal Details", "Admin Account", "Review & Launch"]

export default function CreateJournalPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        journalName: "",
        slug: "",
        adminEmail: "",
        adminPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/tenants`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const result = await res.json()
                router.push('/auth/login?journal=' + result.journal.slug + '&created=true')
            } else {
                const err = await res.json()
                setError(err.message || "Failed to create journal")
            }
        } catch (e) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900/50 p-4">
            <div className="absolute top-4 right-4"><ModeToggle /></div>

            <div className="w-full max-w-lg mb-8">
                <h1 className="text-3xl font-bold text-center mb-2">Setup Your Journal</h1>
                <p className="text-center text-muted-foreground mb-8">Follow the steps to launch your new journal platform.</p>
                <Stepper steps={steps} currentStep={currentStep} className="mb-8" />
            </div>

            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>{steps[currentStep - 1]}</CardTitle>
                    <CardDescription>
                        {currentStep === 1 && "Start by naming your journal and choosing a unique URL."}
                        {currentStep === 2 && "Create the master administrator account."}
                        {currentStep === 3 && "Review your details and launch."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    {error && <div className="bg-destructive/15 text-destructive p-3 rounded text-sm font-medium">{error}</div>}

                    {currentStep === 1 && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="journalName">Journal Name</Label>
                                <Input
                                    id="journalName"
                                    name="journalName"
                                    value={formData.journalName}
                                    onChange={handleChange}
                                    placeholder="e.g. Journal of Advanced Computing"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Subdomain URL</Label>
                                <div className="flex items-center">
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="rounded-r-none"
                                        placeholder="science-journal"
                                        required
                                    />
                                    <span className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-sm text-muted-foreground">
                                        .editlyr.org
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Preview: <span className="font-medium text-primary">https://{formData.slug || 'your-slug'}.editlyr.org</span>
                                </p>
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="adminEmail">Admin Email</Label>
                                <Input
                                    id="adminEmail"
                                    name="adminEmail"
                                    type="email"
                                    value={formData.adminEmail}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="adminPassword">Password</Label>
                                <Input
                                    id="adminPassword"
                                    name="adminPassword"
                                    type="password"
                                    value={formData.adminPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
                                <div>
                                    <span className="block text-muted-foreground">Journal Name</span>
                                    <span className="font-semibold">{formData.journalName}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-muted-foreground">URL</span>
                                    <span className="font-semibold">{formData.slug}.editlyr.org</span>
                                </div>
                                <div>
                                    <span className="block text-muted-foreground">Admin Email</span>
                                    <span className="font-semibold">{formData.adminEmail}</span>
                                </div>
                            </div>
                            <p className="text-sm text-center text-muted-foreground">
                                By clicking Launch, you agree to our Terms of Service.
                            </p>
                        </div>
                    )}

                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 1 ? (
                        <Button variant="outline" onClick={prevStep} disabled={loading}>Back</Button>
                    ) : (
                        <Link href="/">
                            <Button variant="ghost">Cancel</Button>
                        </Link>
                    )}

                    {currentStep < 3 ? (
                        <Button onClick={nextStep} disabled={!formData.journalName && currentStep === 1}>Continue</Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Launching Journal...' : 'Launch Journal 🚀'}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
