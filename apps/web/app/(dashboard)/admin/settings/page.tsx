import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { Button } from "@/components/ui/button"

export default async function AdminSettingsPage() {
    const session = await getServerSession(authOptions)
    // In a real app, we fetch the journal details here
    // const journal = await fetch(...) 

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Journal Settings</h1>

            <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">General Information</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Journal Name</label>
                        <input className="w-full p-2 border rounded" defaultValue="My Journal" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full p-2 border rounded h-24" defaultValue="A great journal..."></textarea>
                    </div>
                    <Button>Save Changes</Button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Plan & Billing</h2>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
                    <div>
                        <p className="font-medium">Current Plan: <span className="text-blue-600 font-bold">FREE</span></p>
                        <p className="text-sm text-gray-500">5 submissions / month limit active.</p>
                    </div>
                    <Button variant="outline">Upgrade to PRO</Button>
                </div>
            </div>
        </div>
    )
}
