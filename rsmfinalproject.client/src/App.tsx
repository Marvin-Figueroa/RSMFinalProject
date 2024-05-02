import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SalesPerformanceTable from "./components/SalesPerformanceTable";
import ProductCategorySelector from "./components/ProductCategorySelector";
import { ProductCategory } from "./hooks/useProductCategories";
import { useState } from "react";
import { Region } from "./hooks/useSalesRegions";
import SalesRegionSelector from "./components/SalesRegionSelector";

function App() {

    const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>(null);
    const [selectedSalesRegion, setSelectedSalesRegion] = useState<Region | null>(null);

    return (
        <Grid templateAreas={`"nav" "main"`}>
            <GridItem area='nav'><NavBar /></GridItem>
            <GridItem area='main' padding='10px'>
                <ProductCategorySelector
                    selectedProductCategory={selectedProductCategory}
                    onSelectProductCategory={(category) => setSelectedProductCategory(category)} />
                <SalesRegionSelector
                    selectedSalesRegion={selectedSalesRegion}
                    onSelectSalesRegion={(region) => setSelectedSalesRegion(region)} />
                <SalesPerformanceTable selectedProductCategory={selectedProductCategory} selectedSalesRegion={selectedSalesRegion} />
            </GridItem>
        </Grid>
    );
}

export default App;