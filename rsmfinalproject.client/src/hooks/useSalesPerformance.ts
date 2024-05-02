import useData from "./useData";
export interface SalesPerformanceRecord {
    id: number;
    productName: string;
    productCategory: string;
    region: string;
    totalSales: number;
    percentageOfTotalSalesPerRegion: number;
    percentageOfTotalCategorySalesInRegion: number;
}

const useSalesPerformance = () => useData<SalesPerformanceRecord>('/performance');

export default useSalesPerformance