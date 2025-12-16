import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import EditorActions from "@/components/editor/editor-actions"
import { FileText, Clock, User, MessageSquare } from "lucide-react"

export default async function EditorSubmissionPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    let submission: any = null

    if (session?.accessToken) {
        const res = await fetch(`${process.env.API_URL}/editor/submissions/${params.id}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
            cache: 'no-store'
        })
        if (res.ok) submission = await res.json()
    }

    if (!submission) return <div className="p-8 text-center text-muted-foreground">Submission not found</div>

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SUBMITTED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
            case 'UNDER_REVIEW': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
            case 'ACCEPTED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${getStatusColor(submission.status)} hover:${getStatusColor(submission.status)} border-none`}>
                            {submission.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{submission.title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{submission.author?.name || submission.author.email}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {submission.fileUrl && (
                        <Button variant="outline" asChild>
                            <a href={submission.fileUrl} target="_blank" rel="noreferrer">
                                <FileText className="mr-2 h-4 w-4" />
                                View Manuscript
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Abstract</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{submission.abstract}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Peer Reviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {submission.reviews.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                                    No reviews assigned or completed yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {submission.reviews.map((review: any) => (
                                        <div key={review.id} className="border rounded-lg p-4 bg-card">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{review.reviewer?.name || 'Reviewer'}</p>
                                                        <p className="text-xs text-muted-foreground">{review.status}</p>
                                                    </div>
                                                </div>
                                                {review.score && (
                                                    <Badge variant={review.score >= 7 ? "default" : "secondary"}>
                                                        Score: {review.score}/10
                                                    </Badge>
                                                )}
                                            </div>
                                            {review.content ? (
                                                <p className="text-sm text-foreground/90 mt-2 p-3 bg-muted/50 rounded">{review.content}</p>
                                            ) : (
                                                <p className="text-sm text-muted-foreground italic">Review pending...</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Actions & Timeline */}
                <div className="space-y-6">
                    <Card className="border-l-4 border-l-primary">
                        <CardHeader>
                            <CardTitle>Editorial Decision</CardTitle>
                            <CardDescription>Take action on this submission.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EditorActions submissionId={submission.id} token={session?.accessToken} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Submission Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">ID</span>
                                <span className="font-mono">{submission.id.split('-')[0]}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Submitted</span>
                                <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Version</span>
                                <span>v1.0</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
