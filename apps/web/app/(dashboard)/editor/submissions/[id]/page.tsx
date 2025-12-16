import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { Button } from "@/components/ui/button"
import EditorActions from "@/components/editor/editor-actions" // Client component for actions

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

    if (!submission) return <div>Submission not found</div>

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{submission.title}</h1>
                    <p className="text-gray-500">By {submission.author?.name || submission.author.email}</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{submission.status}</span>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-8">
                    <section className="bg-white p-6 rounded-lg border shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Abstract</h2>
                        <p className="text-gray-700 leading-relaxed">{submission.abstract}</p>
                        <div className="mt-6">
                            <a href={submission.fileUrl} target="_blank" rel="noreferrer">
                                <Button variant="outline">Download Manuscript</Button>
                            </a>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-lg border shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Reviews</h2>
                        {submission.reviews.length === 0 ? (
                            <p className="text-gray-500 italic">No reviews yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {submission.reviews.map((review: any) => (
                                    <div key={review.id} className="border p-4 rounded bg-gray-50">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{review.reviewer?.name || 'Reviewer'}</span>
                                            <span className="text-sm text-gray-500">{review.status}</span>
                                        </div>
                                        {review.content && (
                                            <div className="mt-2">
                                                <div className="text-sm font-medium mb-1">Score: {review.score}/10</div>
                                                <p className="text-sm">{review.content}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="col-span-1 space-y-4">
                    <EditorActions submissionId={submission.id} token={session?.accessToken} />
                </div>
            </div>
        </div>
    )
}
