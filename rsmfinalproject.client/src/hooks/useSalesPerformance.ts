import { SalesPerformanceQuery } from "../pages/SalesPerformancePage";
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

const useSalesPerformance = (salesPerformanceQuery: SalesPerformanceQuery) =>
    useData<SalesPerformanceRecord>('/performance',
        {
            params: {
                category: salesPerformanceQuery.category?.name,
                territory: salesPerformanceQuery.territory?.name,
                product: salesPerformanceQuery.searchText,
                pageNumber: salesPerformanceQuery.pageNumber,
                pageSize: salesPerformanceQuery.pageSize
            }
        },
        [salesPerformanceQuery]);

export default useSalesPerformance