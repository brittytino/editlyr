"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check, CreditCard } from "lucide-react"
import { useState } from "react"

export function UpgradeModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleUpgrade = () => {
        setLoading(true)
        // Mock API call
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
            alert("Upgrade successful! (Mock)")
        }, 2000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upgrade to Professional</DialogTitle>
                    <DialogDescription>
                        Unlock custom domains, unlimited storage, and priority support.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" /> <span>Custom Domain (your-journal.org)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" /> <span>100GB Storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" /> <span>Remove 'Powered by Editlyr'</span>
                    </div>

                    <div className="p-4 bg-muted rounded-lg mt-2">
                        <div className="flex justify-between font-bold mb-2">
                            <span>Total due today</span>
                            <span>$29.00</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Recurring monthly. Cancel anytime.</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpgrade} disabled={loading} className="w-full">
                        {loading ? "Processing..." : (
                            <>
                                <CreditCard className="mr-2 h-4 w-4" /> Pay with Card
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
