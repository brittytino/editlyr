import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import PluginsList from "@/components/plugins/plugins-list" // Client component

export default async function PluginsPage() {
    const session = await getServerSession(authOptions)

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-2">Plugin Store</h1>
            <p className="text-gray-600 mb-8">Extend your journal with powerful add-ons.</p>

            <PluginsList token={session?.accessToken} />
        </div>
    )
}
