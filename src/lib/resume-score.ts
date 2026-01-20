export const ALLOWED_RESUME_MIME_TYPES = ["application/pdf"] as const;

export const MAX_RESUME_UPLOAD_MB = 5;
export const MAX_RESUME_UPLOAD_BYTES = MAX_RESUME_UPLOAD_MB * 1024 * 1024;

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateResumeFile(file: File) {
  if (!ALLOWED_RESUME_MIME_TYPES.includes(file.type as "application/pdf")) {
    return "Please upload a PDF file.";
  }

  if (file.size > MAX_RESUME_UPLOAD_BYTES) {
    return `PDF is too large. Max ${MAX_RESUME_UPLOAD_MB}MB.`;
  }

  return null;
}
