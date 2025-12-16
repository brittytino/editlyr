import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

export default async function PlatformAdminPage() {
    const session = await getServerSession(authOptions)
    // Check if super-admin (simple email check for MVP)
    const isSuperAdmin = session?.user?.email === 'admin@editlyr.org' // Or a specific Role.SUPER_ADMIN in DB

    if (!isSuperAdmin) {
        // return <div>Unauthorized</div> // Uncomment to enforce
    }

    // Mock Data
    const stats = { revenue: 1250, journals: 12, submissions: 145 }
    const tenants = [
        { name: 'Journal of Science', plan: 'PRO', status: 'Active', revenue: '$29' },
        { name: 'Biology Today', plan: 'FREE', status: 'Active', revenue: '$0' },
        { name: 'Physics Letters', plan: 'PRO', status: 'Past Due', revenue: '$29' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Platform Overview</h1>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded border shadow-sm">
                        <p className="text-gray-500 text-sm font-medium">Monthly Revenue</p>
                        <p className="text-3xl font-bold">${stats.revenue}</p>
                    </div>
                    <div className="bg-white p-6 rounded border shadow-sm">
                        <p className="text-gray-500 text-sm font-medium">Active Journals</p>
                        <p className="text-3xl font-bold">{stats.journals}</p>
                    </div>
                    <div className="bg-white p-6 rounded border shadow-sm">
                        <p className="text-gray-500 text-sm font-medium">Total Submissions</p>
                        <p className="text-3xl font-bold">{stats.submissions}</p>
                    </div>
                </div>

                <div className="bg-white rounded border shadow-sm">
                    <div className="p-4 border-b font-semibold">Tenants</div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-sm font-medium">Journal</th>
                                <th className="p-4 text-sm font-medium">Plan</th>
                                <th className="p-4 text-sm font-medium">Status</th>
                                <th className="p-4 text-sm font-medium">MRR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map((t, i) => (
                                <tr key={i} className="border-b">
                                    <td className="p-4">{t.name}</td>
                                    <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{t.plan}</span></td>
                                    <td className="p-4 text-sm text-gray-600">{t.status}</td>
                                    <td className="p-4 font-medium">{t.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
