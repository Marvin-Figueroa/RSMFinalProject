import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";

interface FetchSalesPerformanceRecordsResponse {
    count: number;
    results: SalesPerformanceRecord[];
}
interface SalesPerformanceRecord {
    id: number;
    productName: string;
    productCategory: string;
    region: string;
    totalSales: number;
    percentageOfTotalSalesPerRegion: number;
    percentageOfTotalCategorySalesInRegion: number;
}

const useSalesPerformanceData = () => {
    const [salesPerformanceRecords, setSalesPerformanceRecords] = useState<SalesPerformanceRecord[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true)
        apiClient.get<FetchSalesPerformanceRecordsResponse>('/performance', { signal: controller.signal })
            .then(res => {
                setSalesPerformanceRecords(res.data.results);
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

    return {salesPerformanceRecords, error, loading}
}

export default useSalesPerformanceData