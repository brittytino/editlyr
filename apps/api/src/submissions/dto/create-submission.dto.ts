export class CreateSubmissionDto {
    title: string;
    abstract?: string;
    fileUrl?: string; // Optional if handled via signed URL flow
}
