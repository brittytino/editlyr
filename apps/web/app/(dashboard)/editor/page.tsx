import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditorDashboard() {
    const session = await getServerSession(authOptions)
    let submissions = []
    if (session?.accessToken) {
        try {
            const res = await fetch(`${process.env.API_URL}/editor/submissions`, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                cache: 'no-store'
            })
            if (res.ok) submissions = await res.json()
        } catch (e) { console.error(e) }
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Editor Dashboard</h1>
            <div className="bg-white rounded-md border shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium">Author</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub: any) => (
                            <tr key={sub.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">{sub.title}</td>
                                <td className="p-4">{sub.author?.name || sub.author?.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${sub.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                            sub.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="p-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <Link href={`/editor/submissions/${sub.id}`}>
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
