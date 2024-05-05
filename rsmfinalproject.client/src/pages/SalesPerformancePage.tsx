import { Box, HStack, Text } from "@chakra-ui/react";
import ProductCategorySelector from "../components/ProductCategorySelector";
import SalesPerformanceTable from "../components/SalesPerformanceTable";
import SalesRegionSelector from "../components/SalesRegionSelector";
import SearchBox from "../components/SearchBox";
import { ProductCategory } from "../hooks/useProductCategories";
import { Region } from "../hooks/useSalesRegions";
import { useState } from "react";
import { Pagination } from "antd";
import useSalesPerformance from "../hooks/useSalesPerformance";
import SalesPerformanceReportMenu from "../components/SalesPerformanceReportMenu";

export interface SalesPerformanceQuery {
    category: ProductCategory | null;
    territory: Region | null;
    searchText: string;
    pageNumber: number;
    pageSize: number;
}

const SalesPerformancePage = () => {
    const [salesPerformanceQuery, setSalesPerformanceQuery] = useState<SalesPerformanceQuery>({} as SalesPerformanceQuery);
    const { data, error, loading } = useSalesPerformance(salesPerformanceQuery);

    if (error) return <Text textAlign='center' color='crimson'>{error}</Text>

    return (
        <>

            <HStack display='flex' justifyContent='center' gap='20px' marginY='30px'>
                <SearchBox disabled={loading} placeholderText="product..." onSearch={(searchText) => setSalesPerformanceQuery({ ...salesPerformanceQuery, searchText, pageNumber: 1 })} />
                <ProductCategorySelector
                    selectedProductCategory={salesPerformanceQuery.category}
                    onSelectProductCategory={(category) => setSalesPerformanceQuery({ ...salesPerformanceQuery, category, pageNumber: 1 })} />
                <SalesRegionSelector
                    selectedSalesRegion={salesPerformanceQuery.territory}
                    onSelectSalesRegion={(region) => setSalesPerformanceQuery({ ...salesPerformanceQuery, territory: region, pageNumber: 1 })} />
                <SalesPerformanceReportMenu data={data.results} />
            </HStack>
            <SalesPerformanceTable
                data={data.results}
                loading={loading}
            />
            <Box marginY='20px' display='flex' justifyContent='center'>
                <Pagination
                    disabled={loading}
                    current={salesPerformanceQuery.pageNumber}
                    onChange={(page, size) => setSalesPerformanceQuery({ ...salesPerformanceQuery, pageNumber: page, pageSize: size })}
                    total={data?.count}
                    hideOnSinglePage
                />
            </Box>
        </>
    );
}

export default SalesPerformancePage;
