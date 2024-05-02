import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SalesPerformanceTable from "./components/SalesPerformanceTable";
import ProductCategorySelector from "./components/ProductCategorySelector";
import { ProductCategory } from "./hooks/useProductCategories";
import { useState } from "react";
import { Region } from "./hooks/useSalesRegions";
import SalesRegionSelector from "./components/SalesRegionSelector";
import SearchBox from "./components/SearchBox";

export interface SalesPerformanceQuery {
    category: ProductCategory | null;
    territory: Region | null;
    searchText: string;
}

function App() {

    const [salesPerformanceQuery, setSalesPerformanceQuery] = useState<SalesPerformanceQuery>({} as SalesPerformanceQuery);

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' padding='10px'>
                <HStack justifyContent='center' padding='10px'>
                    <SearchBox onSearch={(searchText) => setSalesPerformanceQuery({ ...salesPerformanceQuery, searchText })} />
                    <ProductCategorySelector
                        selectedProductCategory={salesPerformanceQuery.category}
                        onSelectProductCategory={(category) => setSalesPerformanceQuery({ ...salesPerformanceQuery, category })} />
                    <SalesRegionSelector
                        selectedSalesRegion={salesPerformanceQuery.territory}
                        onSelectSalesRegion={(region) => setSalesPerformanceQuery({ ...salesPerformanceQuery, territory: region })} />
                </HStack>
                <SalesPerformanceTable salesPerformanceQuery={salesPerformanceQuery} />
            </GridItem>
        </Grid>
    );
}

export default App;