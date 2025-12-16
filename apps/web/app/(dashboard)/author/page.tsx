import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default async function AuthorDashboard() {
    const session = await getServerSession(authOptions)
    // Fetch submissions from API (server-side)
    let submissions = []
    if (session?.accessToken) {
        try {
            const res = await fetch(`${process.env.API_URL}/submissions`, {
                headers: { Authorization: `Bearer ${session.accessToken}` }
            })
            if (res.ok) submissions = await res.json()
        } catch (e) { console.error(e) }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Author Dashboard</h1>
                <Link href="/author/submit">
                    <Button>New Submission</Button>
                </Link>
            </div>

            <div className="bg-white rounded-md border">
                {submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No submissions yet. Start your first one!
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((sub: any) => (
                                <tr key={sub.id} className="border-b">
                                    <td className="p-4">{sub.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-gray-500">View</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
