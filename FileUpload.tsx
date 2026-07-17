"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
    onSuccess: (res: UploadResponse) => void;
    onProgress?: (progress: number) => void;
    onError?: (error: string) => void;
    accept?: string;
    maxSizeMB?: number;
}

interface UploadResponse {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl?: string;
    size: number;
    filePath: string;
}

const FileUpload = ({
    onSuccess,
    onProgress,
    onError,
    accept = "*/*",
    maxSizeMB = 100,
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const validateFile = (file: File): boolean => {
        if (file.size > maxSizeMB * 1024 * 1024) {
            const errMsg = `File size must be less than ${maxSizeMB} MB`;
            setError(errMsg);
            onError?.(errMsg);
            return false;
        }
        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        if (!validateFile(file)) {
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            // Get auth parameters from our API
            const authRes = await fetch("/api/auth/imagekit-auth");
            if (!authRes.ok) {
                throw new Error("Failed to get upload authentication");
            }
            const auth = await authRes.json();

            // Create FormData for upload
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("publicKey", process.env.NEXT_PUBLIC_PUBLIC_KEY!);
            formData.append("signature", auth.signature);
            formData.append("expire", auth.expire.toString());
            formData.append("token", auth.token);

            // Upload using XMLHttpRequest for progress tracking
            const result = await new Promise<UploadResponse>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener("progress", (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round((event.loaded / event.total) * 100);
                        setProgress(percent);
                        onProgress?.(percent);
                    }
                });

                xhr.addEventListener("load", () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        resolve({
                            fileId: response.fileId,
                            name: response.name,
                            url: response.url,
                            thumbnailUrl: response.thumbnailUrl,
                            size: response.size,
                            filePath: response.filePath,
                        });
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                xhr.addEventListener("error", () => {
                    reject(new Error("Network error during upload"));
                });

                xhr.addEventListener("abort", () => {
                    reject(new Error("Upload aborted"));
                });

                xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
                xhr.send(formData);
            });

            onSuccess(result);
            setProgress(100);
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : "Upload failed";
            setError(errMsg);
            onError?.(errMsg);
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors
          ${uploading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 text-black"
                    }`}
            >
                {uploading ? (
                    <>
                        <span className="animate-spin">⏳</span>
                        <span>Uploading... {progress}%</span>
                    </>
                ) : (
                    <>
                        <span>📁</span>
                        <span>Upload File</span>
                    </>
                )}
            </label>
            {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;