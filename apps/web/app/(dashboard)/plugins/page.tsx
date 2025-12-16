"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bot, FileText, Globe, Lock, Mail, Shield, Users } from "lucide-react"

const plugins = [
    {
        id: "ai-reviewer",
        name: "AI Review Assistant",
        description: "Automated grammar and style checks for submissions.",
        icon: Bot,
        enabled: true,
        premium: true
    },
    {
        id: "plagiarism",
        name: "Plagiarism Detection",
        description: "Integrated similarity check via Crossref Similarity Check.",
        icon: Shield,
        enabled: false,
        premium: true
    },
    {
        id: "orcid",
        name: "ORCID Integration",
        description: "Allow authors and reviewers to sign in with ORCID.",
        icon: Users,
        enabled: true,
        premium: false
    },
    {
        id: "doi",
        name: "DOI Registration",
        description: "Auto-register DOIs with Crossref upon publication.",
        icon: Globe,
        enabled: true,
        premium: false
    },
    {
        id: "pdf-generator",
        name: "PDF Generator",
        description: "Automatically generate PDF proofs from JATS XML.",
        icon: FileText,
        enabled: true,
        premium: false
    },
    {
        id: "sso",
        name: "SAML / SSO",
        description: "Enterprise single sign-on integration.",
        icon: Lock,
        enabled: false,
        premium: true
    }
]

export default function PluginsPage() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Plugins & Modules</h2>
                <p className="text-muted-foreground">Manage extensions for your journal.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plugins.map((plugin) => (
                    <Card key={plugin.id} className="flex flex-col">
                        <CardHeader className="flex-none">
                            <div className="flex items-start justify-between">
                                <plugin.icon className="h-8 w-8 text-muted-foreground mb-4" />
                                <Switch checked={plugin.enabled} />
                            </div>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {plugin.name}
                                {plugin.premium && (
                                    <span className="inline-flex items-center rounded-full border border-amber-500 text-amber-500 text-[10px] font-semibold px-2 py-0.5">
                                        PRO
                                    </span>
                                )}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {plugin.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
