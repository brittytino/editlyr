import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import ReviewForm from "@/components/reviews/review-form"

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

    if (!review) return <div>Review not found</div>

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Review: {review.submission.title}</h1>

            <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-100">
                <h3 className="font-semibold mb-2">Abstract</h3>
                <p className="text-sm text-gray-800">{review.submission.abstract}</p>
                {review.submission.fileUrl && (
                    <div className="mt-4">
                        <a href={review.submission.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            Download Manuscript
                        </a>
                    </div>
                )}
            </div>

            <ReviewForm reviewId={review.id} token={session?.accessToken} />
        </div>
    )
}
