import { useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";

import apiClient from "../services/apiClient";

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

const SalesPerformanceTable = () => {
    const [salesPerformanceRecords, setSalesPerformanceRecords] = useState<SalesPerformanceRecord[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        apiClient.get<FetchSalesPerformanceRecordsResponse>('/performance')
            .then(res => {
                setSalesPerformanceRecords(res.data.results);
                setError('');
            })
            .catch(error => setError(error.message))
        .finally(() => setLoading(false))
    }, [])

    return (

        <> {loading && <Text> Loading...</Text >}
            {error && <Text color='crimson'>{error}</Text> }
            <ul>{
                salesPerformanceRecords.map(record => <li key={record.id}>{record.productName}</li>)
            }</ul>
        </>
  );
}

export default SalesPerformanceTable;