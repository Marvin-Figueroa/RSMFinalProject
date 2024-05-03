import { HStack } from "@chakra-ui/react";
import ProductCategorySelector from "../components/ProductCategorySelector";
import SalesPerformanceTable from "../components/SalesPerformanceTable";
import SalesRegionSelector from "../components/SalesRegionSelector";
import SearchBox from "../components/SearchBox";
import { ProductCategory } from "../hooks/useProductCategories";
import { Region } from "../hooks/useSalesRegions";
import { useState } from "react";

export interface SalesPerformanceQuery {
    category: ProductCategory | null;
    territory: Region | null;
    searchText: string;
    pageNumber: number;
    pageSize: number;
}

const SalesPerformancePage = () => {
    const [salesPerformanceQuery, setSalesPerformanceQuery] = useState<SalesPerformanceQuery>({} as SalesPerformanceQuery);

    return (
        <><HStack display='flex' justifyContent='center' gap='20px' marginY='30px'>
            <SearchBox placeholder="product..." onSearch={(searchText) => setSalesPerformanceQuery({ ...salesPerformanceQuery, searchText })} />
            <ProductCategorySelector
                selectedProductCategory={salesPerformanceQuery.category}
                onSelectProductCategory={(category) => setSalesPerformanceQuery({ ...salesPerformanceQuery, category })} />
            <SalesRegionSelector
                selectedSalesRegion={salesPerformanceQuery.territory}
                onSelectSalesRegion={(region) => setSalesPerformanceQuery({ ...salesPerformanceQuery, territory: region })} />
        </HStack><SalesPerformanceTable
                salesPerformanceQuery={salesPerformanceQuery}
                onPageChange={(page, size) => setSalesPerformanceQuery({ ...salesPerformanceQuery, pageNumber: page, pageSize: size })}
            /></>
    );
}

export default SalesPerformancePage;
