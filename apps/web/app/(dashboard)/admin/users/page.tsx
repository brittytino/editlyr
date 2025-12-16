import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminUsersPage() {
    const session = await getServerSession(authOptions)
    let users = []
    if (session?.accessToken) {
        try {
            const res = await fetch(`${process.env.API_URL}/users`, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                cache: 'no-store'
            })
            if (res.ok) users = await res.json()
        } catch (e) { console.error(e) }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <Link href="/admin/users/invite">
                    <Button>+ Invite User</Button>
                </Link>
            </div>

            <div className="bg-white rounded-md border shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{u.name || '-'}</td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4">
                                    {u.roles.map((r: string) => (
                                        <span key={r} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1">{r}</span>
                                    ))}
                                </td>
                                <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
