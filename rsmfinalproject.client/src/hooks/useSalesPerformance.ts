import useData from "./useData";
import { ProductCategory } from "./useProductCategories";
import { Region } from "./useSalesRegions";
export interface SalesPerformanceRecord {
    id: number;
    productName: string;
    productCategory: string;
    region: string;
    totalSales: number;
    percentageOfTotalSalesPerRegion: number;
    percentageOfTotalCategorySalesInRegion: number;
}

const useSalesPerformance = (selectedProductCategory: ProductCategory | null, selectedSalesRegion: Region | null) =>
    useData<SalesPerformanceRecord>('/performance',
        { params: { category: selectedProductCategory?.name, territory: selectedSalesRegion?.name } },
        [selectedProductCategory?.name, selectedSalesRegion?.name]);

export default useSalesPerformance