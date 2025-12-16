import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import ReviewForm from "@/components/reviews/review-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Download } from "lucide-react"

export default async function ReviewPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    let review: any = null

    if (session?.accessToken) {
        const res = await fetch(`${process.env.API_URL}/reviews/${params.id}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
            cache: 'no-store'
        })
        if (res.ok) review = await res.json()
    }

    if (!review) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <h2 className="text-xl font-semibold mb-2">Review Not Found</h2>
            <p className="text-muted-foreground">It may have been withdrawn or reassigned.</p>
        </div>
    )

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-8">
            <div className="space-y-2 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">Peer Review Assignment</h1>
                <p className="text-muted-foreground">
                    Please review the manuscript below and complete the evaluation form.
                </p>
            </div>

            <Separator />

            {/* Manuscript Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{review.submission.title}</CardTitle>
                    <CardDescription>
                        Read the abstract and download the full text before assessing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                        <h4 className="font-semibold text-sm uppercase tracking-wide">Abstract</h4>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                            {review.submission.abstract}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <FileText className="mr-2 h-4 w-4" />
                            Manuscript.pdf
                        </div>
                        {review.submission.fileUrl ? (
                            <Button variant="outline" size="sm" asChild>
                                <a href={review.submission.fileUrl} target="_blank" rel="noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </a>
                            </Button>
                        ) : (
                            <Button variant="ghost" size="sm" disabled>Unavailable</Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Assessment Form */}
            <div className="bg-background">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    Evaluation
                </h3>
                <ReviewForm reviewId={review.id} token={session?.accessToken} />
            </div>
        </div>
    )
}
