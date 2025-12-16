export default async function ArticlePage({ params }: { params: { id: string } }) {
    let article: any = null
    try {
        // Public fetch, no token needed
        const res = await fetch(`${process.env.API_URL}/public/articles/${params.id}`, { cache: 'no-store' })
        if (res.ok) article = await res.json()
    } catch (e) { }

    if (!article) return <div className="p-8 text-center">Article not found (or not published).</div>

    return (
        <div className="max-w-4xl mx-auto p-12">
            <div className="mb-8 border-b pb-8">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-4">{article.author?.name}</span>
                    <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">Abstract</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">{article.abstract}</p>
            </div>

            {article.fileUrl && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border text-center">
                    <p className="mb-4 font-medium">Full Text Access</p>
                    <a
                        href={article.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
                    >
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    )
}
