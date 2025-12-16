import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ReviewerDashboard() {
    const session = await getServerSession(authOptions)
    let reviews = []
    if (session?.accessToken) {
        try {
            const res = await fetch(`${process.env.API_URL}/reviews/me`, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                cache: 'no-store'
            })
            if (res.ok) reviews = await res.json()
        } catch (e) { console.error(e) }
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Reviewer Dashboard</h1>
            <div className="bg-white rounded-md border shadow-sm">
                {reviews.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No review assignments yet.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-medium">Submission</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Assigned Date</th>
                                <th className="p-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((rev: any) => (
                                <tr key={rev.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{rev.submission.title}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${rev.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                rev.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                            {rev.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{new Date(rev.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        {rev.status === 'PENDING' ? (
                                            <Link href={`/reviews/${rev.id}`}>
                                                <Button size="sm">Accept / Review</Button>
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500 text-sm">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
