import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";

interface FetchSalesDetailsRecordsResponse {
    count: number;
    results: SalesDetailsRecord[];
}

interface SalesDetailsRecord {
    orderID: number;
    salesOrderDetailID: number;
    date: string; // Date in ISO 8601 format
    onlineOrder: boolean;
    territory: string;
    customerPerson: string;
    customerStore: string;
    salesperson: string;
    product: string;
    category: string;
    subcategory: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  

const useSalesDetails = () => {
    const [salesDetailsRecords, setSalesDetailsRecords] = useState<SalesDetailsRecord[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true)
        apiClient.get<FetchSalesDetailsRecordsResponse>('/details', { signal: controller.signal })
            .then(res => {
                setSalesDetailsRecords(res.data.results);
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

    return {salesDetailsRecords, error, loading}
}

export default useSalesDetails