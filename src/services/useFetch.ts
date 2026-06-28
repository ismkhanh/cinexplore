import { useCallback, useEffect, useRef, useState } from "react";

const useFetch = <T>(fetchFunction: (signal: AbortSignal) => Promise<T>, autoFetch: boolean = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(async () => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(controller.signal);
            if (!controller.signal.aborted) {
                setData(result);
            }
        } catch (err) {
            if (!controller.signal.aborted) {
                setError(err instanceof Error ? err.message : "An error occurred");
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [fetchFunction]);

    const reset = () => {
        abortControllerRef.current?.abort();
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [autoFetch, fetchData]);

    return { data, loading, error, fetchData, reset };
}

export default useFetch;
