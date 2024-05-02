import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SalesPerformanceTable from "./components/SalesPerformanceTable";
import ProductCategorySelector from "./components/ProductCategorySelector";
import { ProductCategory } from "./hooks/useProductCategories";
import { useState } from "react";
import { Region } from "./hooks/useSalesRegions";
import SalesRegionSelector from "./components/SalesRegionSelector";

export interface SalesPerformanceQuery {
    category: ProductCategory | null;
    territory: Region | null;
}

function App() {

    const [salesPerformanceQuery, setSalesPerformanceQuery] = useState<SalesPerformanceQuery>({} as SalesPerformanceQuery);

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' padding='10px'>
                <ProductCategorySelector
                    selectedProductCategory={salesPerformanceQuery.category}
                    onSelectProductCategory={(category) => setSalesPerformanceQuery({ ...salesPerformanceQuery, category })} />
                <SalesRegionSelector
                    selectedSalesRegion={salesPerformanceQuery.territory}
                    onSelectSalesRegion={(region) => setSalesPerformanceQuery({ ...salesPerformanceQuery, territory: region })} />
                <SalesPerformanceTable salesPerformanceQuery={salesPerformanceQuery} />
            </GridItem>
        </Grid>
    );
}

export default App;