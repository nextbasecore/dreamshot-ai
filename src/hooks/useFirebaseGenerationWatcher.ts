import { useState, useEffect, startTransition, useRef } from "react";
import { db } from "@/firebase";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";

type GenerationStatus = "pending" | "completed" | "failed";

interface GenerationResult {
    thumbnail?: string;
    video?: string;
    image?: string;
    type: "video" | "image";
}

interface GenerationData {
    status: GenerationStatus;
    result?: GenerationResult[];
    hasErrorShown?: boolean;
    error?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

/**
 * Hook for monitoring Firebase generation job status
 * Watches the Firestore document at users/{uid}/generations/{jobId}
 * @param jobId - The job ID returned from the generation API
 * @param userId - The current user's Firebase UID
 * @returns Object containing status, result, and error
 */
export function useFirebaseGenerationWatcher(
    jobId: string | null,
    userId: string | undefined
) {
    const [status, setStatus] = useState<GenerationStatus | null>(null);
    const [result, setResult] = useState<GenerationResult[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const failedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Don't set up listener if jobId or userId is missing
        if (!jobId || !userId) {
            return;
        }

        const firestorePath = `users/${userId}/generations/${jobId}`;
        console.log(`[FIREBASE_WATCHER] 👀 Setting up Firebase listener:`, {
            jobId,
            userId,
            path: firestorePath,
        });

        // Set up Firestore listener
        const generationRef = doc(db, "users", userId, "generations", jobId);

        const unsubscribe = onSnapshot(
            generationRef,
            (snapshot) => {
                if (!snapshot.exists()) {
                    console.error(`[FIREBASE_WATCHER] ❌ Generation job not found:`, { jobId, path: firestorePath });
                    setError(new Error("Generation job not found"));
                    return;
                }

                const data = snapshot.data() as GenerationData;

                // Update status
                const currentStatus = data.status as GenerationStatus;

                console.log(`[FIREBASE_WATCHER] 📊 Status update:`, {
                    jobId,
                    status: currentStatus,
                    hasResult: !!data.result,
                    resultCount: data.result?.length || 0,
                    hasError: !!data.error,
                    updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
                });

                setStatus(currentStatus);

                // Clear any pending failed timeout if status changes
                if (failedTimeoutRef.current) {
                    clearTimeout(failedTimeoutRef.current);
                    failedTimeoutRef.current = null;
                }

                // Update result when completed
                if (currentStatus === "completed" && data.result) {
                    console.log(`[FIREBASE_WATCHER] 🎉 Generation completed!`, {
                        jobId,
                        resultCount: data.result.length,
                        results: data.result.map((r) => ({
                            type: r.type,
                            hasVideo: !!r.video,
                            hasImage: !!r.image,
                            hasThumbnail: !!r.thumbnail,
                        })),
                    });
                    setResult(data.result);
                    setError(null);
                } else if (currentStatus === "failed") {
                    // Add a grace period before showing error (3 seconds)
                    // This prevents showing error for transient failures that recover
                    console.warn(`[FIREBASE_WATCHER] ⚠️ Generation marked as failed, waiting 3s before showing error...`, {
                        jobId,
                        hasErrorMessage: !!data.error
                    });

                    failedTimeoutRef.current = setTimeout(() => {
                        // Double-check the status is still failed after grace period
                        console.error(`[FIREBASE_WATCHER] ❌ Generation failed after grace period:`, {
                            jobId,
                            errorMessage: data.error
                        });
                        setError(new Error(data.error || "Generation failed"));
                    }, 3000); // 3 second grace period
                } else {
                    // Still pending
                    console.log(`[FIREBASE_WATCHER] ⏳ Generation still pending:`, { jobId });
                    setError(null);
                }
            },
            (err) => {
                // Handle snapshot errors
                console.error(`[FIREBASE_WATCHER] ❌ Snapshot error:`, {
                    jobId,
                    error: err instanceof Error ? err.message : String(err),
                });
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to watch generation status")
                );
            }
        );

        console.log(`[FIREBASE_WATCHER] ✅ Listener set up successfully`);

        // Cleanup listener on unmount or when jobId/userId changes
        return () => {
            console.log(`[FIREBASE_WATCHER] 🧹 Cleaning up Firebase listener:`, { jobId });
            if (failedTimeoutRef.current) {
                clearTimeout(failedTimeoutRef.current);
            }
            unsubscribe();
        };
    }, [jobId, userId]);

    // Reset state when jobId or userId becomes invalid
    // Using startTransition to wrap state updates to avoid linter warnings
    useEffect(() => {
        if (!jobId || !userId) {
            startTransition(() => {
                setStatus(null);
                setResult(null);
                setError(null);
            });
        }
    }, [jobId, userId]);

    return {
        status,
        result,
        error,
    };
}

