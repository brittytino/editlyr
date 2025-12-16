import SubmissionForm from "@/components/submissions/submission-form"

export default function SubmitPage() {
    return (
        <div className="max-w-2xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-2">Submit New Manuscript</h1>
            <p className="text-gray-500 mb-8">Please fill in the details and upload your PDF.</p>

            <SubmissionForm />
        </div>
    )
}
