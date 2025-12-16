import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, User, FileText } from "lucide-react"

export default async function ArticlePage({ params }: { params: { id: string } }) {
    let article: any = null
    try {
        const res = await fetch(`${process.env.API_URL}/public/articles/${params.id}`, { cache: 'no-store' })
        if (res.ok) article = await res.json()
    } catch (e) { }

    if (!article) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold">Article not found</h2>
            <p>The requested article could not be located or is not yet published.</p>
        </div>
    )

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-muted/30 border-b py-16 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Badge variant="secondary" className="mb-2">Original Research</Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm md:text-base">
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span className="font-medium text-foreground">{article.author?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Published on {new Date(article.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="md:col-span-8 space-y-8">
                    <section className="prose dark:prose-invert max-w-none">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-4 text-sm">Abstract</h3>
                        <p className="lead text-lg leading-relaxed text-foreground/90">
                            {article.abstract}
                        </p>
                    </section>

                    <div className="border-t pt-8">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-4 text-sm">Introduction</h3>
                        <p className="text-muted-foreground italic">
                            (Full text rendering would appear here. For this demo, please download the PDF to read the complete manuscript.)
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="sticky top-8">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Access</h3>
                            {article.fileUrl ? (
                                <Button className="w-full" size="lg" asChild>
                                    <a href={article.fileUrl} target="_blank" rel="noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download PDF
                                    </a>
                                </Button>
                            ) : (
                                <Button disabled className="w-full" variant="outline">PDF Unavailable</Button>
                            )}

                            <div className="pt-4 border-t space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">DOI</span>
                                    <span className="font-mono text-xs">10.1234/editlyr.{article.id.slice(0, 5)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">License</span>
                                    <span>CC BY 4.0</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
