import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { Button } from "@/components/ui/button"
import BillingAction from "@/components/billing/billing-action" // Client component

export default async function BillingPage() {
    const session = await getServerSession(authOptions)
    // Fetch subscription details
    // For MVP, we pass the session token to the client component to fetch/initiate

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Subscriptions & Billing</h1>

            <div className="bg-white p-8 rounded-lg border shadow-sm text-center">
                <h2 className="text-2xl font-semibold mb-2">Upgrade to Professional</h2>
                <p className="text-gray-600 mb-8">
                    Unlock custom domains, unlimited submissions, and remove branding.
                </p>

                <div className="flex justify-center gap-8 mb-8">
                    <div className="border p-6 rounded-lg w-64 bg-gray-50">
                        <h3 className="font-bold text-lg">Free</h3>
                        <p className="text-3xl font-bold my-4">$0<span className="text-sm font-normal">/mo</span></p>
                        <ul className="text-left text-sm space-y-2 mb-6">
                            <li>✓ 5 Submissions/mo</li>
                            <li>✓ Standard Support</li>
                            <li>✕ Editlyr Branding</li>
                        </ul>
                        <Button disabled variant="outline" className="w-full">Current Plan</Button>
                    </div>

                    <div className="border p-6 rounded-lg w-64 border-blue-500 ring-1 ring-blue-500 bg-white shadow-md relative">
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">RECOMMENDED</div>
                        <h3 className="font-bold text-lg">Professional</h3>
                        <p className="text-3xl font-bold my-4">$29<span className="text-sm font-normal">/mo</span></p>
                        <ul className="text-left text-sm space-y-2 mb-6">
                            <li>✓ Unlimited Submissions</li>
                            <li>✓ Priority Support</li>
                            <li>✓ Custom Domains</li>
                            <li>✓ No Branding</li>
                        </ul>
                        <BillingAction token={session?.accessToken} />
                    </div>
                </div>
            </div>
        </div>
    )
}
