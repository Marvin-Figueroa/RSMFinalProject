import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";

interface FetchResponse<T> {
    count: number;
    results: T[];
}


const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true)
        apiClient.get<FetchResponse<T>>(endpoint, { signal: controller.signal })
            .then(res => {
                setData(res.data.results);
                setLoading(false);
                setError('');
            })
            .catch(error => {
                setLoading(false)
                if (error instanceof CanceledError) return;
                setError(error.message);
            })

        return () => controller.abort();
    }, [])

    return { data, error, loading }
}

export default useData