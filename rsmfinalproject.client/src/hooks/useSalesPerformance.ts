import useData from "./useData";
import { ProductCategory } from "./useProductCategories";
export interface SalesPerformanceRecord {
    id: number;
    productName: string;
    productCategory: string;
    region: string;
    totalSales: number;
    percentageOfTotalSalesPerRegion: number;
    percentageOfTotalCategorySalesInRegion: number;
}

const useSalesPerformance = (selectedProductCategory: ProductCategory | null) => useData<SalesPerformanceRecord>('/performance',
    { params: { category: selectedProductCategory?.name } }, [selectedProductCategory?.name]);

export default useSalesPerformance